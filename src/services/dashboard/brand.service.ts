import { createApi } from "@reduxjs/toolkit/query/react"
import {  baseQuery } from "@/api/baseQuery"
import { ApiMessage, Id, ListParams } from "@/types/shared.types"
import { unwrap } from "@/helper/helper"
import { apiPaths } from "@/constants"
import { BrandAPIResponse, BrandViewResponse, CreateBrandResponse } from "@/types/types"

export const brandApi = createApi({
  reducerPath: 'brandApi',
  baseQuery,
  tagTypes: ['Brand'],
  endpoints: (b) => ({
    getBrands: b.query<BrandAPIResponse, ListParams | void>({
      query: (p) => ({ url: apiPaths.brands, params: p ?? {} }),
      transformResponse: unwrap<BrandAPIResponse>,
      providesTags: ['Brand'],
    }),
    createBrand: b.mutation<CreateBrandResponse, FormData>({
      query: (body) => ({ url: apiPaths.brands, method: 'POST', body }),
      transformResponse: unwrap<CreateBrandResponse>,
      invalidatesTags: ['Brand'],
    }),
    updateBrand: b.mutation<CreateBrandResponse, { id: Id, formData: FormData } >({
      query: ({ id, formData }) => ({ url: `${apiPaths.brands}/${id}`, method: 'PUT', body: formData }),
      transformResponse: unwrap<CreateBrandResponse>,
      invalidatesTags: ['Brand'],
    }),
    publishBrand: b.mutation<ApiMessage, Id>({
      query: (id) => ({ url: `${apiPaths.brands}/${id}/publish`, method: 'PATCH', body: {} }),
      invalidatesTags: ['Brand'],
    }),
    deleteBrand: b.mutation<ApiMessage, {id: Id}>({
      query: (id) => ({ url: `${apiPaths.brands}/${id}`, method: 'DELETE' }),
      transformResponse: unwrap<ApiMessage>,
      invalidatesTags: ['Brand'],
    }),
    brandById: b.query<BrandViewResponse, {id: Id}>({
      query: (id) => ({ url: `${apiPaths.brands}/${id}` }),
      transformResponse: unwrap<BrandViewResponse>,
      providesTags: ['Brand'],
    }),
  }),
})
export const {
  useGetBrandsQuery, useCreateBrandMutation, useUpdateBrandMutation,
  usePublishBrandMutation, useDeleteBrandMutation, useBrandByIdQuery,
} = brandApi