

import {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
  useChangePasswordMutation,
  useChoosePlanMutation,
  useCompanyMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResendOTPMutation,
} from "./auth/auth.service";
import {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  usePublishBrandMutation,
  useDeleteBrandMutation,
  useBrandByIdQuery,
} from "./dashboard/brand.service";
import {
  useDeleteTeamMutation,
  useGetTeamsQuery,
} from "./dashboard/team.service";
import { useGetDashboardQuery } from "./dashboard/dashboard.service";
import { useGetSubscriptionsAddonsQuery, useGetSubscriptionsQuery } from "./auth/subscription.service";
import { useGetCartInformationsQuery, useApplyCouponMutation } from "./auth/cart.service";

export const apiServices = {

  // AUTH
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
  useChangePasswordMutation,
  useChoosePlanMutation,
  useCompanyMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResendOTPMutation,

  // BRAND
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  usePublishBrandMutation,
  useDeleteBrandMutation,
  useBrandByIdQuery,

  // TEAMS
  useGetTeamsQuery,
  useDeleteTeamMutation,

  // Dashboard
  useGetDashboardQuery,


  // SUBSCRIPTION
  useGetSubscriptionsQuery,
  useGetSubscriptionsAddonsQuery,


  // CART
  useGetCartInformationsQuery,
  useApplyCouponMutation
};
