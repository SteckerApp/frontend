import { RouteLocationNormalized, type RouteRecordRaw } from 'vue-router';

import { Auth, PreventAuth } from '../../router/middleware';
import RouteService from '@/services/route-service'
import DashboardPageLayout from '@/layouts/DashboardPageLayout.vue';
import DashboardViewMock from './views/DashboardViewMock.vue';
import ProfileViewMock from './views/ProfileViewMock.vue';
import WithdrawalViewMock from './views/WithdrawalViewMock.vue';

const AffiliateRoutes: Array<RouteRecordRaw> = [
    {
      path: '/affiliate',
      name: 'Affiliate',
      component: DashboardPageLayout,
      meta:{menuItemsToShow:'affiliate'},
      children: [
        {
          path: 'dashboard/mock',
          name: 'Affiliate.Dashboard.Mock',
          component: DashboardViewMock,
        },
        {
          path: 'dashboard',
          name: 'Affiliate.Dashboard',
          component: DashboardViewMock,
        },
        {
          path: 'profile/mock',
          name: 'Affiliate.Profile.Mock',
          component: ProfileViewMock,
        },
        {
          path: 'profile',
          name: 'Affiliate.Profile',
          component: ProfileViewMock,
        },
        {
          path: 'withdrawal/mock',
          name: 'Affiliate.Withdrawal.Mock',
          component: WithdrawalViewMock,
        },
        {
          path: 'withdrawal',
          name: 'Affiliate.Withdrawal',
          component: WithdrawalViewMock,
        },
      ]
    }
  ];

export default AffiliateRoutes;
