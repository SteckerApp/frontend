import {
  AffiliateOnly,
  Bootstrap,
  ClientOrAffiliate,
  Private,
  PublicOnly,
} from '@/access/access'
import { paths } from '@/constants'
import {
  LoginScreen, ForgotPasswordScreen, RegisterScreen, OTPScreen, ProfileScreen,
  CompanyProfileScreen, PricingPlanScreen, SuccessScreen, PlanCartScreen, CheckoutScreen,
  DashboardOverview, DashboardRequest, DashboardBrand, DashboardWorkspace, DashboardBilling,
  DashboardRequestChat, DashboardAffiliateOverview, DashboardAffiliateProfile,
  DashboardAffiliateWithdrawal, DashboardNotification, DashboardCreateProjectSteps,
  ChangePasswordScreen,
} from '@/modules'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Bootstrap>
      <Routes>
        {/* Signed-out only */}
        <Route element={<PublicOnly />}>
          <Route path={paths.home} element={<Navigate to={paths.login} />} />
          <Route path={paths.login} element={<LoginScreen />} />
          <Route path={paths.forgotPassword} element={<ForgotPasswordScreen />} />
          <Route path={paths.changePassword} element={<ChangePasswordScreen />} />
          <Route path={paths.register} element={<RegisterScreen />} />
          <Route path={paths.otpVerify} element={<OTPScreen />} />
          <Route path={paths.completeProfile} element={<ProfileScreen />} />
          <Route path={paths.companyProfile} element={<CompanyProfileScreen />} />
          <Route path={paths.choosePlan} element={<PricingPlanScreen />} />
          <Route path={paths.planCart} element={<PlanCartScreen />} />
          <Route path={paths.checkout} element={<CheckoutScreen />} />
          <Route path={paths.success} element={<SuccessScreen />} />
        </Route>

        {/* Signed in */}
        <Route element={<Private />}>
          {/* Client dashboard: user_type "client" or "affiliate" */}
          <Route element={<ClientOrAffiliate />}>
            <Route path={paths.dashboardOverview} element={<DashboardOverview />} />
            <Route path={paths.dashboardRequest} element={<DashboardRequest />} />
            <Route path={paths.dashboardRequestCreateProject} element={<DashboardCreateProjectSteps />} />
            <Route path={paths.dashboardRequestChat} element={<DashboardRequestChat />} />
            <Route path={paths.dashboardBrand} element={<DashboardBrand />} />
            <Route path={paths.dashboardWorkspace} element={<DashboardWorkspace />} />
            <Route path={paths.dashboardBilling} element={<DashboardBilling />} />
            <Route path={paths.dashboardNotify} element={<DashboardNotification />} />
          </Route>

          {/* Affiliate dashboard: user_type "affiliate" only */}
          <Route element={<AffiliateOnly />}>
            <Route path={paths.affiliateDashboard} element={<DashboardAffiliateOverview />} />
            <Route path={paths.affiliateDashboardProfile} element={<DashboardAffiliateProfile />} />
            <Route path={paths.affiliateDashboardWithdrawal} element={<DashboardAffiliateWithdrawal />} />
          </Route>
        </Route>

        {/* Anything else */}
        <Route path="*" element={<Navigate to={paths.login} replace />} />
      </Routes>
    </Bootstrap>
  )
}

export { AppRoutes }