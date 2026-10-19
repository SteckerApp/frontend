import { baseQuery } from "@/api/baseQuery";
import { apiPaths } from "@/constants/api";
import { ApplyCouponData, CartTransactionResponse, CartQuantity } from "@/types/cart.types";
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

    updateCartQuantity: b.mutation<ApiMessage, { reference: string } & CartQuantity>({
      query: ({ reference, ...body }) => ({
        url: `${apiPaths.planCart}/${reference}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Cart", "Subscription"],
    }),
  }),
});
export const { useGetCartInformationsQuery, useApplyCouponMutation, useUpdateCartQuantityMutation } = cartApi;
