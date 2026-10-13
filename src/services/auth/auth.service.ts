import { createApi } from '@reduxjs/toolkit/query/react'
import { LoginCredentials, LoginResponse, UserRegistration } from '@/types/auth.types'
import { baseQuery } from '@/api/baseQuery'
import { apiPaths } from '@/constants'
import { unwrap } from '@/helper/helper';
import { ApiMessage } from '@/types/shared.types';
import { ChoosePlanAPIResponse, UserProfileResponse } from '@/types/types';



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (b) => ({
    login: b.mutation<LoginResponse, LoginCredentials>({
      query: (body) => ({ url: apiPaths.auth, method: 'POST', body }),
    }),
    register: b.mutation<ApiMessage, UserRegistration>({
      query: (body) => ({ url: apiPaths.register, method: 'POST', body }),
    }),
    getMe: b.query<UserProfileResponse, void>({
      query: () => apiPaths.profile,
      transformResponse: unwrap<UserProfileResponse>,
    }),
    logout: b.mutation<ApiMessage, void>({
      query: () => ({ url: apiPaths.logout, method: 'DELETE', body: {} }),
    }),
    changePassword: b.mutation<ApiMessage, UserRegistration>({
      query: (body) => ({ url: apiPaths.changePassword, method: 'POST', body }),
    }),

    forgotPassword: b.mutation<ApiMessage, UserRegistration>({
      query: (body) => ({ url: apiPaths.forgot, method: 'POST', body }),
    }),

    verifyEmail: b.mutation<ApiMessage, UserRegistration>({
      query: (body) => ({ url: apiPaths.verifyEmail, method: 'POST', body }),
    }),

    resendOTP: b.mutation<ApiMessage, UserRegistration>({
      query: (body) => ({ url: apiPaths.resendOTP, method: 'POST', body }),
    }),

    choosePlan: b.mutation<ChoosePlanAPIResponse, ChoosePlanAPIResponse>({
      query: (body) => ({ url: apiPaths.choosePlan, method: 'POST', body }),
    }),

    company: b.mutation<ApiMessage, { formData: FormData}>({
      query: (formData) => ({ url: apiPaths.company, method: 'POST', body: formData }),
    }),
  }),
})
export const {
  useLoginMutation, useRegisterMutation, useGetMeQuery,
  useLogoutMutation, useChangePasswordMutation,
  useChoosePlanMutation,
  useCompanyMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResendOTPMutation
} = authApi

