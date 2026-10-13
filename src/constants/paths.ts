
export const HomePrefix = '/'
export const AuthPrefix = HomePrefix + 'auth';
export const SetUpPrefix = HomePrefix + 'u';
export const DashboardPrefix = '/spark/dashboard'


export const paths = {
    home: HomePrefix,
    login: AuthPrefix + '/login',
    register: SetUpPrefix + '/register',
    forgotPassword: SetUpPrefix + '/forgot-password',
    changePassword: SetUpPrefix + '/change-password/:token/',
    otpVerify: SetUpPrefix + '/email-verify',
    newPassword: AuthPrefix + "/new-password",
    resetSuccess: AuthPrefix + "/reset/success",
    completeProfile: SetUpPrefix + "/complete-profile",
    companyProfile: SetUpPrefix + "/company-profile",
    choosePlan: SetUpPrefix + "/choose-plan",
    planCart: SetUpPrefix + "/order-cart",
    checkout: SetUpPrefix + "/order-checkout",
    success: SetUpPrefix + "/success",
    terms: HomePrefix + 'terms',
    privacy: HomePrefix + 'privacy',
    about: HomePrefix + 'about',
    faq: HomePrefix + 'faq',
    dashboardOverview: DashboardPrefix + "/overview/",
    dashboardRequest: DashboardPrefix + "/request/",
    dashboardRequestCreateProject: DashboardPrefix + "/request/create/",
    dashboardRequestChat: DashboardPrefix + "/request/chat/?",
    dashboardBrand: DashboardPrefix + "/brand/",
    dashboardWorkspace: DashboardPrefix + "/workspace/",
    dashboardBilling: DashboardPrefix + "/Billing/",
    dashboardNotify: DashboardPrefix + "/overview/notifications/",

    affiliateDashboard: DashboardPrefix + "/affiliate/overview/",
    affiliateDashboardProfile: DashboardPrefix + "/affiliate/profile/",
    affiliateDashboardWithdrawal: DashboardPrefix + "/affiliate/withdrawal/",
}
