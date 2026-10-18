import { AuthLayout, Input, OAuth } from '@/components'
import { Link, useNavigate } from "react-router-dom"
import { paths } from "@/constants"
import { Button } from "antd"
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { Schema } from '@/schema/Schema'
import { apiServices } from '@/services'
import { spark } from '@/config'
import { useAppDispatch } from '@/store/hook'
import { setCredentials, setUser } from '@/store/authSlice'


const Login = () => {
  const navigate = useNavigate();
   const dispatch   = useAppDispatch()
  const [ loginUser, { isLoading } ] = apiServices.useLoginMutation();


  const formik = useFormik({
    initialValues: {
      user_type: 'client',
      email: '',
      password: '',
    },
    validationSchema: Schema.LoginSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        const res = await loginUser(values).unwrap();
       if(res?.data?.token) {
         dispatch(setCredentials({ ...res.data }))
        dispatch(setUser(res?.data.user))
        toast.success(`Welcome back, ${res.data.user.firstName}!`)
        navigate(spark.after_auth_path)
       }
      } catch (err) {
        console.log("login error:", err)
        toast.error(
          (err as { data?: { message?: string } })?.data?.message ?? 'Invalid email or password',
        )
      }
    },
  })


  return (
   <AuthLayout height='h-auto lg:h-[55rem]' width='lg:w-[586px]' >
        <span className='text-25 md:text-30 text-center md:text-left font-medium font-outfit text-black'>Welcome Back</span>
        <p className='text-gray text-15 md:text-18 text-center md:text-left font-regular font-outfit pt-2 border-b border-border pb-8 mb-8'>Enter your email and password</p>
        <form onSubmit={formik.handleSubmit}>
        <Input type='email' label='Email Address' name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='enter email address' />
        <Input type='password' label='Password' name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='*******' padding="mt-5" />
        <Link to={paths.forgotPassword} className="flex justify-end items-end text-primary text-16 font-outfit font-medium pt-2">Forgot Password?</Link>

          <Button disabled={!formik.isValid} type="primary" size="large" className="w-full mt-9" htmlType='submit' loading={isLoading}>Login</Button>
        </form>
        <OAuth label="Don't have an account?" text="Sign Up" path={paths.register} />
    </AuthLayout>
  )
}

export default Login
