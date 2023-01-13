
<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex flex-column mx-auto my-auto authContainer position-absolute hpx-700 wpx-500 bg-white pxpx-70  pypx-150">
      <span class="d-flex auth fs-30 lh-35 text-black mt-3">
        <!-- <span @click="router.go(-1)" class="material-icons me-3 my-auto text-black cursor-pointer">west</span> -->
        <span class="my-auto">Complete Your Profile!</span>
      </span>
      <span class="auth-instruction fs-15 lh-28 mt-3">Please confirm your email address</span>

      <hr class="mypx-20 authDivider"/>


      <div class="mb-3">
        <AuthTextInput 
          element-class="auth-element hpx-50"
          maxlength="8" 
          :showCheckIcon="form.code.length == 8" 
          required 
          label="Enter OTP code sent to your email" 
          v-model="form.code" acceptNumberOnly
          :error-msg="serverError.code?.[0] || v$.code.$errors[0]?.$message"
        />
      </div>
      
      <FormButton label="Next" class="mt-5 h-min-50" @click="handleSubmission"/>
      

      <div class="d-flex mt-4 fs-14 lh-18 fw-300 justify-content-center">
        <span class="otpText gilroy-regular my-auto me-2">Didn't get OTP?</span>
        <a href="#"><span class="my-auto text-blue" @click="executeResendOTP">Resend</span></a>
      </div>



    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {validateVerificationForm} from '../validator'
import {verifyEmail,resendOTP} from '../services'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'

let { form, v$ } = validateVerificationForm();

 const {
  isLoading: verificationIsLoading,
  error: verificationError,
  isSuccessful: verificationIsSuccessful,
  execute: executeVerification,
} = verifyEmail(form);

 const {
  isLoading: resendOTPIsLoading,
  execute: executeResendOTP,
} = resendOTP();

const router = useRouter()

 const handleSubmission = ()=>{
    v$.value.$validate();
    if(v$.value.$invalid) return;
    executeVerification().then((res: any) => {
      if (verificationIsSuccessful.value) {
        AlertService.toast('success','Success',res.message)
        router.push({name:"Auth.Company.Profile"})
      }
    })
 }
const serverError = computed(() => {
  return HelperService.getObjectProperty(verificationError, "value.errors", {});
});


</script>


<style lang="scss" scoped>
@import '../style.scss';
  .otpText{
    font-style: normal;
    color:#8692A6
  }
</style>