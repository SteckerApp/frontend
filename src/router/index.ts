import { createRouter,createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import RouteService from '@/services/route-service'
import HomeRoutes from '@/modules/home/routes';
import AuthRoutes from '@/modules/auth/routes';
import SubscriptionRoutes from '@/modules/subscription/routes'
import ClientRoutes from '@/modules/clients/routes'
import AffiliateRoutes from '@/modules/affiliates/routes'
import store from '../store';
import {GetVisitorInfo} from './middleware'

// Route for different user types
const routes: RouteRecordRaw[] = [
  ...HomeRoutes,
  ...AuthRoutes,
  ...SubscriptionRoutes,
  ...ClientRoutes,
  ...AffiliateRoutes,
  //...RouteService.PrefixRoutesWith('/admin', AdminRoutes)
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //history: createWebHashHistory(),
  routes
})

const globalMiddleware = {
  beforeAll: [GetVisitorInfo],
  afterAll: []
};
//RouteService.RunMiddlewareOnAllRoute(router, store, globalMiddleware);
RouteService.RunMiddlewareOnAllRoute(router, store);

export default router
