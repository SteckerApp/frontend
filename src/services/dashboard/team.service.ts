import { createApi } from "@reduxjs/toolkit/query/react"
import {  baseQuery } from "@/api/baseQuery"
import { ApiMessage, Id, ListParams } from "@/types/shared.types"
import { unwrap } from "@/helper/helper"
import { apiPaths } from "@/constants"
import {  BrandViewResponse, CreateBrandResponse, WorkspaceAPIResponse } from "@/types/types"

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery,
  tagTypes: ['Brand'],
  endpoints: (b) => ({
    getTeams: b.query<WorkspaceAPIResponse, ListParams | void>({
      query: (p) => ({ url: apiPaths.teams, params: p ?? {} }),
      transformResponse: unwrap<WorkspaceAPIResponse>,
      providesTags: ['Brand'],
    }),
    createBrand: b.mutation<CreateBrandResponse, FormData>({
      query: (body) => ({ url: apiPaths.brands, method: 'POST', body }),
      transformResponse: unwrap<CreateBrandResponse>,
      invalidatesTags: ['Brand'],
    }),
    updateBrand: b.mutation<CreateBrandResponse, { id: Id } & FormData>({
      query: ({ id, ...body }) => ({ url: `${apiPaths.brands}/${id}`, method: 'PATCH', body }),
      transformResponse: unwrap<CreateBrandResponse>,
      invalidatesTags: ['Brand'],
    }),
    publishBrand: b.mutation<ApiMessage, Id>({
      query: (id) => ({ url: `${apiPaths.brands}/${id}/publish`, method: 'PATCH', body: {} }),
      invalidatesTags: ['Brand'],
    }),
    deleteTeam: b.mutation<ApiMessage, Id>({
      query: (id) => ({ url: `${apiPaths.teams}/${id}`, method: 'DELETE' }),
      transformResponse: unwrap<ApiMessage>,
      invalidatesTags: ['Brand'],
    }),
    brandById: b.query<BrandViewResponse, Id>({
      query: (id) => ({ url: `${apiPaths.brands}/${id}` }),
      transformResponse: unwrap<BrandViewResponse>,
      providesTags: ['Brand'],
    }),
  }),
})
export const {
  useGetTeamsQuery, useCreateBrandMutation, useUpdateBrandMutation,
  usePublishBrandMutation, useDeleteTeamMutation, useBrandByIdQuery,
} = teamApi