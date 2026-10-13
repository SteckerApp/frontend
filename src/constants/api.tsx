

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
}