import { spark } from '@/config';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { setTokens, clearAuth } from "@/store/authSlice"
import type { RootState } from '@/store/store'
import { RefreshPayload, RefreshResponse } from '@/types/auth.types';


export const rawBase = fetchBaseQuery({
  baseUrl: spark.apiBaseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

/** Wraps rawBase with silent 401 -> refresh -> retry */
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  let res = await rawBase(args, api, extra)

  if (res.error?.status === 401) {
    const rt = (api.getState() as RootState).auth.refreshToken

    if (rt) {
      const refresh = await rawBase(
        { url: '/auth/refresh', method: 'POST', body: { refreshToken: rt } },
        api,
        extra,
      )

      if (refresh.data) {
        const body = refresh.data as RefreshResponse
        const payload: RefreshPayload = 'data' in body ? body.data : body
        const newToken = payload.token ?? payload.accessToken

        if (newToken) {
          api.dispatch(
            setTokens({
              token: newToken,
              refreshToken: payload.refreshToken ?? rt,
            }),
          )
          res = await rawBase(args, api, extra)
        } else {
          api.dispatch(clearAuth())
        }
      } else {
        api.dispatch(clearAuth())
      }
    } else {
      api.dispatch(clearAuth())
    }
  }

  return res
}