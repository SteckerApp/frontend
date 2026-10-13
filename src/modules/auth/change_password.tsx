import { AuthLayout, Input, OAuth } from "@/components";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "@/constants";
import { Button } from "antd";
import { useFormik } from "formik";
import { apiServices } from "@/services";
import { Schema } from "@/schema/Schema";
import { toast } from "react-toastify";


const ChangePassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [ changePassword, { isLoading: isChangePasswordLoading }] = apiServices.useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      token: token || "",
    },
    validationSchema: Schema.ChangePasswordSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const res = await changePassword(values).unwrap();
        if(res?.status === 200) {
          navigate(paths.success)
        }
      } catch (err) {
        const message =
        (err as { data?: { message?: string } })?.data?.message ?? 'Something went wrong. Please try again.'
        toast.error(message)
      }
    },
  });

  return (
    <AuthLayout height="h-auto lg:h-[55rem]" width="md:w-[586px]">
      <span className="text-30 font-medium font-outfit text-black">
        Change Password
      </span>
      <p className="text-gray text-18 font-regular font-outfit pt-2 border-b border-border pb-8 mb-8">
        Enter your new password below to reset your account access.
      </p>
      <form onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="Email Address"
          placeholder="Enter your email address"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs pt-1">{formik.errors.email}</p>
        )}

        {/* Password Field */}
        <Input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          label="New Password"
          placeholder="Enter new password"
          padding="mt-5"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs pt-1">{formik.errors.password}</p>
        )}

        {/* Confirm Password Field */}
        <Input
          type="password"
          name="password_confirmation"
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          label="Confirm Password"
          placeholder="Confirm new password"
          padding="mt-5"
        />
        {formik.touched.password_confirmation && formik.errors.password_confirmation && (
          <p className="text-red-500 text-xs pt-1">{formik.errors.password_confirmation}</p>
        )}

        {/* Submit Button */}
        <Button
          type="primary"
          className="w-full mt-7"
          htmlType="submit"
          loading={isChangePasswordLoading}
          disabled={!formik.isValid}
        >
          Change Password
        </Button>
      </form>

      <OAuth label="Don't have an account?" text="Sign Up" path={paths.register} />
    </AuthLayout>
  );
};

export default ChangePassword;
