import { AuthLayout, Input, OAuth } from "@/components";
import { Link } from "react-router-dom";
import { paths } from "@/constants";
import { Button } from "antd";
import { useFormik } from "formik";
import { apiServices } from "@/services";
import { Schema } from "@/schema/Schema";
import { toast } from "react-toastify";

const Forgot = () => {
  const [ forgotPassword, { isLoading: isForgotPasswordLoading }] = apiServices.useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Schema.ForgotPasswordSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await forgotPassword(values).unwrap()
        toast.success(res?.message ?? 'Check your email for a reset link')
        resetForm()
      } catch (err) {
        console.log("error:", err)
        toast.error(
          (err as { data?: { message?: string } })?.data?.message ??
            'Could not send reset link. Please try again.',
        )
      }
    },
  })

  return (
    <AuthLayout height="h-auto lg:h-[55rem]" width="md:w-[586px]">
      <span className="text-30 font-medium font-outfit text-black">
        Forgot Password?
      </span>
      <p className="text-gray text-18 font-regular font-outfit pt-2 border-b border-border pb-8 mb-8">
        Please enter your email address. You will receive a link to create a new
        password via email.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          label="Email Address"
          placeholder="enter your email address"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs pt-1">{formik.errors.email}</p>
        )}
        <Button
          type="primary"
          className="w-full mt-7"
          htmlType="submit"
          loading={isForgotPasswordLoading}
        >
          Reset Password
        </Button>
      </form>

      <Link to={paths.login}>
        <Button type="default" className="w-full mt-16">
          Back to Login
        </Button>
      </Link>
      <OAuth
        label="Don't have an account?"
        text="Sign Up"
        path={paths.register}
      />
    </AuthLayout>
  );
};

export default Forgot;
