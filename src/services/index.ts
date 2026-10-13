

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
};
