

export const apiPaths = {
    // AUTH
    auth: '/api/auth/login',
    logout: '/api/auth/logout',


    profile: '/api/user',
    brands: '/api/dashboard/brand',
    teams: '/api/dashboard/teams/',

    // DASHBOARD
    getDashboardHome: `/api/dashboard/`,

    // AUTH - REGISTER
    register: '/api/auth/register',
    verifyEmail: '/api/auth/verify/email',
    resendOTP: '/api/auth/resend/verification',
    company: '/api/auth/company',
    choosePlan: '/api/cart/create',
    forgot: '/api/auth/password/reset',
    changePassword: '/api/auth/password',

    // PLANS
    subscription: '/api/subscription',
    subscriptionAddons: '/api/subscription/addons',
    applyCoupon: '/api/cart/coupon/apply',
    plans: '/api/plans',
    planCart: '/api/cart',
    checkout: '/api/checkout',
    success: '/api/checkout/success',

    // AFFILIATE
    affiliateDashboard: '/api/dashboard/affiliate',
    affiliateProfile: '/api/dashboard/affiliate/profile',
    affiliateWithdrawal: '/api/dashboard/affiliate/withdrawal',
}