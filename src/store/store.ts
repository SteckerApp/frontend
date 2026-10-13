import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { authApi } from '@/services/auth/auth.service'
import { brandApi } from '@/services/dashboard/brand.service'
import { teamApi } from '@/services/dashboard/team.service'
import { dashboardApi } from '@/services/dashboard/dashboard.service'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]:     authApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      brandApi.middleware,
      teamApi.middleware,
      dashboardApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch