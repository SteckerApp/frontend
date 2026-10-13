import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Icons, paths } from '@/constants'
import { affiliateRoutes, clientRoutes } from '@/data/routes.data'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { clearAuth, selectUser } from '@/store/authSlice'
import { Referral } from './Referral'
import { DeleteModal } from '../commons'
import { apiServices } from '@/services'

interface SidebarProps {
  isAffiliate?: boolean
}

const Sidebar = ({ isAffiliate = false }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const [isModalOpen, setModalOpen] = useState(false)
  const [logout, { isLoading: logoutLoading }] = apiServices.useLogoutMutation()

  // Only affiliate accounts can jump from the client dashboard to the affiliate one.
  const canSwitchToAffiliate = user?.user_type === 'affiliate'

  const items = (isAffiliate ? affiliateRoutes : clientRoutes).filter((route) => {
    if (route.hidden) return false
    if (route.assign === 'switch_to_affiliate') return canSwitchToAffiliate
    return true
  })

  const toggleModal = () => setModalOpen((open) => !open)

  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } catch {
      // Token may already be invalid; sign out locally either way.
    }
    dispatch(clearAuth())
    setModalOpen(false)
    navigate(paths.login, { replace: true })
  }

  return (
    <div className="bg-sidebar w-full md:w-[15rem] min-h-screen relative border-r border-r-dashboardBg">
      <div className="flex flex-col items-start justify-start w-full">
        <img src={Icons.Logo} alt="Logo" className="mb-4 cursor-pointer px-5 pt-8" />

        <nav className="flex flex-col text-center text-black text-16 font-outfit w-full pt-10">
          {items.map((route) => (
            <Link
              key={route.assign}
              to={route.path}
              className={`flex justify-start font-normal items-center gap-3 py-3 px-5 mb-5 ${
                location.pathname.startsWith(route.path) ? 'active-item' : 'inherit'
              }`}
              onClick={(e) => {
                if (route.assign === 'log_out') {
                  e.preventDefault()
                  toggleModal()
                }
              }}
            >
              {route.icon} {route.name}
            </Link>
          ))}
        </nav>

        <Referral />
      </div>

      <DeleteModal
        open={isModalOpen}
        onCancel={toggleModal}
        title="Logout"
        desc="Are you sure you want to logout?"
        confirmText="Yes, Logout"
        confirmDelete={handleLogout}
        loading={logoutLoading}
      />
    </div>
  )
}

export default Sidebar