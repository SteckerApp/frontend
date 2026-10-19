import { baseQuery } from "@/api/baseQuery"
import { apiPaths } from "@/constants/api"
import { unwrap } from "@/helper/helper"
import { SubscriptionAddonsResponse, SubscriptionResponse, User } from "@/types/auth.types"
import { ApiMessage, Id, ListParams } from "@/types/shared.types"
import { createApi } from '@reduxjs/toolkit/query/react'

export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery,
  tagTypes: ['User', 'Subscription'],
  endpoints: (b) => ({
    getSubscriptions: b.query<SubscriptionResponse, ListParams | void>({
      query: (p) => ({ url: apiPaths.subscription, params: p ?? {} }),
      providesTags: ['Subscription'],
    }),

    getSubscriptionsAddons: b.query<SubscriptionAddonsResponse, ListParams | void>({
      query: (p) => ({ url: apiPaths.subscriptionAddons, params: p ?? {} }),
      providesTags: ['Subscription'],
    }),

    updateMe: b.mutation<User, Partial<User>>({
      query: (body) => ({ url: '/users/me', method: 'PATCH', body }),
      transformResponse: unwrap<User>,
      invalidatesTags: ['Subscription'],
    }),
    updateProfile: b.mutation<User, Partial<User>>({
      query: (body) => ({ url: '/users/me/profile', method: 'PATCH', body }),
      transformResponse: unwrap<User>,
      invalidatesTags: ['Subscription'],
    }),
    adminUpdate: b.mutation<ApiMessage, { id: Id } & Record<string, unknown>>({
      query: ({ id, ...body }) => ({ url: `/users/${id}/admin`, method: 'PATCH', body }),
      invalidatesTags: ['User'],
    }),
    deleteUser: b.mutation<ApiMessage, Id>({
      query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['User'],
    }),
  }),
})
export const {
  useGetSubscriptionsQuery,
  useGetSubscriptionsAddonsQuery,
  useUpdateMeMutation,
  useUpdateProfileMutation,
  useAdminUpdateMutation,
  useDeleteUserMutation,
} = subscriptionApi