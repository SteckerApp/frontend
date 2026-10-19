import { baseQuery } from "@/api/baseQuery";
import { apiPaths } from "@/constants/api";
import { ApplyCouponData, CartTransactionResponse } from "@/types/cart.types";
import { ApiMessage } from "@/types/shared.types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery,
  tagTypes: ["User", "Subscription", "Cart"],
  endpoints: (b) => ({
    getCartInformations: b.query<CartTransactionResponse, string>({
      query: (reference) => ({ url: `${apiPaths.planCart}/${reference}` }),
      providesTags: ["Cart", "User", "Subscription"],
    }),

    applyCoupon: b.mutation<
      ApiMessage,
      ApplyCouponData
    >({
      query: (body) => ({
        url: `${apiPaths.applyCoupon}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const { useGetCartInformationsQuery, useApplyCouponMutation } = cartApi;
