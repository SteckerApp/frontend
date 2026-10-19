import { AuthLayout, Input, OAuth } from "@/components";
import { Button } from "antd";
import { paths } from "@/constants";
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import { apiServices } from "@/services";
import { toast } from "react-toastify";
import { setCredentials, setUser } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hook";

const Register = () => {
  const navigate = useNavigate();
  const dispatch   = useAppDispatch()
  const [ registerUser, { isLoading: isRegisterLoading }] = apiServices.useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      usertype: "client",
    },
    onSubmit: async (values) => {
      try {
        const res = await registerUser(values).unwrap();
        console.log("register res:", res)
        if(res?.data?.token) {
            toast.success(res?.message ?? 'Account created. Check your email for a code.')
            navigate(paths.otpVerify, { state: { email: values.email } })
            dispatch(setCredentials({ ...res.data }))
            dispatch(setUser(res?.data.user))
        }
      } catch (err) {
        toast.error(
          (err as { data?: { message?: string } })?.data?.message ??
            'Could not create your account. Please try again.',
        )
      }
    },
  })

  return (
    <AuthLayout height='h-auto' width="md:w-[586px]">
      <span className="text-30 font-medium font-outfit text-black">
        Create an account
      </span>
      <p className="text-gray text-18 font-regular font-outfit pt-2 border-b border-border pb-8 mb-8">
        Kindly input your details.
      </p>
      <form onSubmit={formik.handleSubmit}>

     
      <Input type="text" label="First Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.first_name}  name="first_name" placeholder="enter your first name" />
      <Input type="text" padding="mt-3" label="Last Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.last_name}  name="last_name" placeholder="enter your last name" />
      <Input
        type="email"
        label="Email Address"
        placeholder="enter your email address"
        padding="my-3"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Create Password" placeholder="********" />

      <p className="text-center text-12 font-medium text-gray font-outfit pt-5">
        By clicking “Next”, you agree to Spark’s{" "}
        <span className="text-primary">Terms of service</span> and{" "}
        <span className="text-primary">Privacy policy</span>.
      </p>
      <Button type="primary" className="w-full mt-7" htmlType="submit" loading={isRegisterLoading}>
        Next
      </Button>
      </form>
      <OAuth label="Already have an account?" text="Login" path={paths.login} />
    </AuthLayout>
  );
};

export default Register;
