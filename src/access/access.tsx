import { Suspense, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { paths } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { clearAuth, selectToken, selectUser, setUser } from '@/store/authSlice'
import { FaSpinner } from 'react-icons/fa'
import { DashboardLayout }from '@/components'
import { apiServices } from '@/services'
import { spark } from '@/config'

// ── Loader fallback ────
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <FaSpinner size={20} />
    </div>
  )
}

// ── Bootstrap: hydrate user on app load ────
export function Bootstrap({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  // const user = useAppSelector(selectUser)
  const { data, isSuccess } = apiServices.useGetMeQuery(undefined, {
    skip: !token,
  })

  console.log("get login user from bootstrap:", data?.data?.user)

  console.log("get login user from bootstrap success:", isSuccess)

  useEffect(() => {
  if (isSuccess && data) {

    dispatch(setUser(data?.data?.user))
  }
}, [dispatch, data, isSuccess])

  // Stay on the splash until the user is in the store. Checking `isFetching`
  // alone leaves a one-render gap between the response arriving and setUser
  // running, and the user_type guards would redirect during that gap.
  if (token && !data?.data?.user ) {

    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <FaSpinner size={20} />
          <p className="text-sm text-dim">Connecting…</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// ── Route guards ───
export function Private() {
  const token = useAppSelector(selectToken)
  console.log("private only token:", token)
  if (!token) return <Navigate to={paths.login} replace />
  return (
    <DashboardLayout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  )
}

/** Clears a session that can't be used (no user, or an unknown user_type) */
function SignOut() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(clearAuth())
  }, [dispatch])
  return <Navigate to={paths.login} replace />
}

interface RequireUserTypeProps {
  allow: readonly string[]
  /** Where to send a signed-in user who isn't allowed here. Omit to sign them out. */
  redirectTo?: string
}

function RequireUserType({ allow, redirectTo }: RequireUserTypeProps) {
  const user = useAppSelector(selectUser)

  if (!user) return <SignOut />
  if (!allow.includes(user.user_type)) {
    return redirectTo ? <Navigate to={redirectTo} replace /> : <SignOut />
  }
  return <Outlet />
}

/** Client dashboard. Affiliates can reach it too ("Switch to Client"). */
export function ClientOrAffiliate() {
  return <RequireUserType allow={['client', 'affiliate']} />
}

/** Affiliate dashboard. Clients are sent back to their own dashboard. */
export function AffiliateOnly() {
  return <RequireUserType allow={['affiliate']} redirectTo={spark.after_auth_path} />
}

export function PublicOnly() {
  const token = useAppSelector(selectToken)

  console.log("public only token:", token)
  if (token) return <Navigate to={paths.dashboardOverview} replace />
  return <Outlet />
}