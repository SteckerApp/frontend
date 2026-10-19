
import { AuthLayout, Input } from '@/components'
import { paths } from '@/constants'
import { apiServices } from '@/services'
import { getErrorMessage } from '@/utils/ultis'
import { Button } from "antd"
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RESEND_SECONDS = 50

const OTP = () => {
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email
  const navigate = useNavigate();
  const [ verifyEmailOTP, {isLoading: isOTPLoading}] = apiServices.useVerifyEmailMutation();
  const [ resendOTP, {isLoading: isResendOTPLoading}] = apiServices.useResendOTPMutation();
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(50);

   const formik = useFormik({
  initialValues: { code: '' },

  onSubmit: async (values) => {
    const code = values.code.trim()

    if (!code) {
      toast.error('Please enter the OTP sent to your email')
      return
    }

    if (code.length !== 8) {
      toast.error('Please enter the complete 8-digit OTP')
      return
    }

    try {

      const res = await verifyEmailOTP({ code }).unwrap()

      toast.success(res?.message ?? 'Email verified')
      navigate(paths.completeProfile)
    } catch (err) {
      toast.error(getErrorMessage(err, 'Invalid or expired code'))
    }
  },
})

  // Tick once a second while resend is locked
  useEffect(() => {
    if (!isResendDisabled) return
    const id = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [isResendDisabled])

  // Unlock when the countdown ends
  useEffect(() => {
    if (isResendDisabled && timer <= 0) setIsResendDisabled(false)
  }, [isResendDisabled, timer])

  const handleResendOTP = async () => {
    try {
      const res = await resendOTP({ email }).unwrap()
      toast.success(res?.message ?? 'A new code has been sent')
      setTimer(RESEND_SECONDS)
      setIsResendDisabled(true)
    } catch (err) {
      toast.error(getErrorMessage(err, 'Could not resend code'))
    }
  }


  return (
    <AuthLayout height='h-auto' width="md:w-[586px]">
        <p className='text-25 md:text-30 font-medium font-outfit text-black text-center'>Complete your profile?</p>
        <p className='text-gray text-18 font-regular font-outfit pt-2 border-b border-border pb-8 mb-8 text-center'>Please confirm your email address</p>
        <form onSubmit={formik.handleSubmit}>
          <Input otpChange={(value) => formik.setFieldValue("code", value)} type='otp' name='code'  value={formik.values.code} length={8} onBlur={formik.handleBlur} label='Enter OTP Code sent to your email' padding="flex justify-center items-center flex-col" />
          <Button type="primary" className="w-full mt-7" htmlType='submit' loading={isOTPLoading}>Next</Button>
        </form>
        <p className="flex justify-center items-center text-center gap-5 text-16 text-gray font-regular font-outfit pt-5">
        Didn't get OTP?
        <p className={`text-primary cursor-pointer ${isResendDisabled  ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={!isResendDisabled ? handleResendOTP : undefined}>
          {isResendDisabled ? `Resend in ${timer}s` : isResendOTPLoading ? 'Sending...' : 'Resend'}
        </p>
      </p>
    </AuthLayout>
  )
}

export default OTP
