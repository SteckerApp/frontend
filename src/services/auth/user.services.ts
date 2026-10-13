import { baseQuery } from "@/api/baseQuery"
import { apiPaths } from "@/constants/api"
import { unwrap } from "@/helper/helper"
import { User } from "@/types/auth.types"
import { ApiMessage, Id, ListParams } from "@/types/shared.types"
import { createApi } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  tagTypes: ['User', 'Me'],
  endpoints: (b) => ({
    getUsers: b.query<User[], ListParams | void>({
      query: (p) => ({ url: '/users', params: p ?? {} }),
      transformResponse: unwrap<User[]>,
      providesTags: ['User'],
    }),
    getMe: b.query<User, void>({
      query: () => apiPaths.profile,
      transformResponse: unwrap<User>,
      providesTags: ['Me'],
    }),
    updateMe: b.mutation<User, Partial<User>>({
      query: (body) => ({ url: '/users/me', method: 'PATCH', body }),
      transformResponse: unwrap<User>,
      invalidatesTags: ['Me'],
    }),
    updateProfile: b.mutation<User, Partial<User>>({
      query: (body) => ({ url: '/users/me/profile', method: 'PATCH', body }),
      transformResponse: unwrap<User>,
      invalidatesTags: ['Me'],
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
  useGetUsersQuery,
  useGetMeQuery: useGetUserMeQuery,
  useUpdateMeMutation,
  useUpdateProfileMutation,
  useAdminUpdateMutation,
  useDeleteUserMutation,
} = usersApi