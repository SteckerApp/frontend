import { createApi } from "@reduxjs/toolkit/query/react"
import {  baseQuery } from "@/api/baseQuery"
import { ApiMessage, Id, ListParams } from "@/types/shared.types"
import { unwrap } from "@/helper/helper"
import { apiPaths } from "@/constants"
import {  BrandViewResponse, CreateBrandResponse, GetDashboardApiResponse } from "@/types/types"

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery,
  tagTypes: ['Dashboard'],
  endpoints: (b) => ({
    getDashboard: b.query<GetDashboardApiResponse, ListParams | void>({
      query: (p) => ({ url: apiPaths.getDashboardHome, params: p ?? {} }),
      transformResponse: unwrap<GetDashboardApiResponse>,
      providesTags: ['Dashboard'],
    }),
    createBrand: b.mutation<CreateBrandResponse, FormData>({
      query: (body) => ({ url: apiPaths.brands, method: 'POST', body }),
      transformResponse: unwrap<CreateBrandResponse>,
      invalidatesTags: ['Dashboard'],
    }),
    updateBrand: b.mutation<CreateBrandResponse, { id: Id } & FormData>({
      query: ({ id, ...body }) => ({ url: `${apiPaths.brands}/${id}`, method: 'PATCH', body }),
      transformResponse: unwrap<CreateBrandResponse>,
      invalidatesTags: ['Dashboard'],
    }),
    publishBrand: b.mutation<ApiMessage, Id>({
      query: (id) => ({ url: `${apiPaths.brands}/${id}/publish`, method: 'PATCH', body: {} }),
      invalidatesTags: ['Dashboard'],
    }),
    deleteTeam: b.mutation<ApiMessage, Id>({
      query: (id) => ({ url: `${apiPaths.teams}/${id}`, method: 'DELETE' }),
      transformResponse: unwrap<ApiMessage>,
      invalidatesTags: ['Dashboard'],
    }),
    brandById: b.query<BrandViewResponse, Id>({
      query: (id) => ({ url: `${apiPaths.brands}/${id}` }),
      transformResponse: unwrap<BrandViewResponse>,
      providesTags: ['Dashboard'],
    }),
  }),
})
export const {
  useGetDashboardQuery, useCreateBrandMutation, useUpdateBrandMutation,
  usePublishBrandMutation, useDeleteTeamMutation, useBrandByIdQuery,
} = dashboardApi