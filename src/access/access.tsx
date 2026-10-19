import { Suspense, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { paths } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { clearAuth, selectToken, selectUser, setUser } from '@/store/authSlice'
import { FaSpinner } from 'react-icons/fa'
import { DashboardLayout, Loading }from '@/components'
import { apiServices } from '@/services'
import { spark } from '@/config'
import { User } from '@/types/auth.types'

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
  const user = useAppSelector(selectUser)

  const {
    data,
    isSuccess,
    isError,
    isFetching,
    refetch,
  } = apiServices.useGetMeQuery(undefined, {
    skip: !token,
  })

  const response = data as
    | {
        user?: User
        data?: { user?: User }
      }
    | undefined

  const authenticatedUser =
    response?.user ?? response?.data?.user

  useEffect(() => {
    if (!token || !isSuccess || !authenticatedUser) return

    dispatch(setUser(authenticatedUser))
  }, [token, isSuccess, authenticatedUser, dispatch])

  if (!token) {
    return <>{children}</>
  }

  // Wait for the API request and Redux hydration.
  if (isFetching || (!isSuccess && !isError)) {
    return (
      <Loading visible={true} text="Connecting…" />
    )
  }

  if (isError || (isSuccess && !authenticatedUser)) {
    return (
      <div className="min-h-screen bg-void flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-sm text-dim text-center">
          {isError
            ? 'Unable to load your account. Please try again.'
            : 'The account response did not contain a user.'}
        </p>

        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-lg bg-violet px-5 py-2 text-sm text-white"
        >
          Try again
        </button>
      </div>
    )
  }

  // setUser is dispatched in an effect, so wait for the Redux update.
  if (!user) {
    return <PageLoader />
  }

  return <>{children}</>
}

// ── Route guards ───
export function Private() {
  const token = useAppSelector(selectToken);
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
  if (token) return <Navigate to={paths.dashboardOverview} replace />
  return <Outlet />
}

export function Onboarding() {
  const token = useAppSelector(selectToken)
  if (!token) return <Navigate to={paths.login} replace />
  return <Outlet />
}