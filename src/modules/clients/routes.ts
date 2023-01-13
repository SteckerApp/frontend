import { RouteLocationNormalized, type RouteRecordRaw } from 'vue-router';

import { Auth, PreventAuth } from '../../router/middleware';
import RouteService from '@/services/route-service'
import DashboardPageLayout from '@/layouts/DashboardPageLayout.vue';
import DashboardView from './views/DashboardView.vue';
import DashboardViewMock from './views/DashboardViewMock.vue';
import BrandView from './views/BrandView.vue';
import WorkspaceView from './views/WorkspaceView.vue';
import WorkspaceViewMock from './views/WorkspaceViewMock.vue';
import PlansViewMock from './views/PlansViewMock.vue';
import CreateProjectViewMock from './views/CreateProjectViewMock.vue';
import RequestViewMock from './views/RequestViewMock.vue';

const ClientRoutes: Array<RouteRecordRaw> = [
    {
      path: '/clients',
      name: 'Clients',
      component: DashboardPageLayout,
      meta:{menuItemsToShow:'client'},
      children: [
        {
          path: 'dashboard/mock',
          name: 'Clients.Dashboard.Mock',
          component: DashboardViewMock,
        },
        {
          path: 'dashboard',
          name: 'Clients.Dashboard',
          component: DashboardView,
        },
        {
          path: 'brand/:mock?',
          name: 'Clients.Brand',
          component: BrandView,
        },
        {
          path: 'workspace/mock',
          name: 'Clients.Workspace.Mock',
          component: WorkspaceViewMock,
        },
        {
          path: 'workspace',
          name: 'Clients.Workspace',
          component: WorkspaceView,
        },
        {
          path: 'plans/mock',
          name: 'Clients.Plans.Mock',
          component: PlansViewMock,
        },
        {
          path: 'plans',
          name: 'Clients.Plans',
          component: PlansViewMock,
        },
        {
          path: 'create/project/mock',
          name: 'Clients.Create.Project.Mock',
          component: CreateProjectViewMock,
          meta:{hideSidebar:true,hideTopbar:true}
        },
        {
          path: 'create/project',
          name: 'Clients.Create.Project',
          component: CreateProjectViewMock,
          meta:{hideSidebar:true,hideTopbar:true}
        },
        {
          path: 'request/mock',
          name: 'Clients.Request.Mock',
          component: RequestViewMock,
          meta:{hideTopImage:true}
        },
        {
          path: 'request',
          name: 'Clients.Request',
          component: RequestViewMock,
          meta:{hideTopImage:true}
        },
      ]
    }
  ];

export default ClientRoutes;
