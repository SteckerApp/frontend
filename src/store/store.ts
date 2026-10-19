import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { authApi } from '@/services/auth/auth.service'
import { brandApi } from '@/services/dashboard/brand.service'
import { teamApi } from '@/services/dashboard/team.service'
import { dashboardApi } from '@/services/dashboard/dashboard.service'
import { subscriptionApi } from '@/services/auth/subscription.service'
import { cartApi } from '@/services/auth/cart.service'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      brandApi.middleware,
      teamApi.middleware,
      dashboardApi.middleware,
      subscriptionApi.middleware,
      cartApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch