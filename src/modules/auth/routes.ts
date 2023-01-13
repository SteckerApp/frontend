import { RouteLocationNormalized, type RouteRecordRaw } from 'vue-router';

import { Auth, PreventAuth } from '../../router/middleware';
import RouteService from '@/services/route-service'
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import EmailVerification from './views/EmailVerification.vue';
import AuthCompanyProfile from './views/AuthCompanyProfile.vue';
import ForgotPasswordPage from './views/ForgotPasswordPage.vue';
import ResetPasswordPage from './views/ResetPasswordPage.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const AuthRoutes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Auth',
      component: AuthLayout,
      children: [
        {
            path: '/login',
            name: 'Auth.Login',
            component: LoginPage,
        },
        {
            path: '/register',
            name: 'Auth.Register',
            component: RegisterPage,
        },
        {
            path: '/email-verification',
            name: 'Auth.Email.Verification',
            component: EmailVerification,
        },
        {
            path: '/forgot-password',
            name: 'Auth.ForgotPassword',
            component: ForgotPasswordPage,
        },
        {
            path: '/reg-company-profile',
            name: 'Auth.Company.Profile',
            component: AuthCompanyProfile,
            meta:{hideLogo:true}
        },
        {
            path: '/reset-password/:token/:email?',
            //path: '/reset-password',
            name: 'Auth.ResetPassword',
            component: ResetPasswordPage,
        },
      ]
    }
  ];

export default AuthRoutes;
