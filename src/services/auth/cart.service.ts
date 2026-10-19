import { baseQuery } from "@/api/baseQuery"
import { apiPaths } from "@/constants/api"
import { CartTransactionResponse } from "@/types/cart.types"
import { createApi } from '@reduxjs/toolkit/query/react'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery,
  tagTypes: ['User', 'Subscription', "Cart"],
  endpoints: (b) => ({
    getCartInformations: b.query<CartTransactionResponse, string>({
      query: (reference) => ({ url: `${apiPaths.planCart}/${reference}` }),
      providesTags: ['Cart', "User", "Subscription"],
    }),
  }),
})
export const {
  useGetCartInformationsQuery,
} = cartApi