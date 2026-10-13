import type { ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { paths } from '@/constants'
import { selectUser } from '@/store/authSlice'
import Sidebar from './Sidebar'
import { Navbar } from './Navbar'
import { BottomNav } from './BottomNav'
import { useAppSelector } from '@/store/hook'
 
interface DashboardLayoutProps {
  children?: ReactNode
}
 
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { pathname } = useLocation()
  const user = useAppSelector(selectUser)
 
  const isAffiliate =
    user?.user_type === 'affiliate' && pathname.startsWith(paths.affiliateDashboard)
 
  return (
    <div className="dashboard_container flex">
      <div className="hidden lg:block fixed">
        <Sidebar isAffiliate={isAffiliate} />
      </div>
 
      <div className="w-full flex flex-col min-h-screen bg-bgAuthDesktop bg-cover bg-center bg-no-repeat ml-0 lg:ml-60">
        <Navbar isAffiliate={isAffiliate} />
 
        <main className="flex-1 px-5 md:px-10 pb-5 pt-5 mb-20 lg:mb-0">
          {children ?? <Outlet />}
          <BottomNav isAffiliate={isAffiliate} />
        </main>
      </div>
    </div>
  )
}
 
export default DashboardLayout