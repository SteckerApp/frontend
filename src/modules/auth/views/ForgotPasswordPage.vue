
<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex flex-column mx-auto my-auto authContainer position-absolute hpx-700 wpx-500 bg-white ppx-70">
      <span class="auth fs-30 lh-35 text-black mt-3">Forgot Password?</span>
      <span class="auth-instruction fs-16 lh-28 mt-3">Please enter your  email address. You will receive a link to create a new password via email.</span>

      <hr class="mypx-20 authDivider"/>


      <div class="mb-3">
        <AuthTextInput element-class="auth-element hpx-50" required label="Email address" type="email" v-model="form.email" :error-msg="serverError.email?.[0] || v$.email.$errors[0]?.$message"/>
      </div>

      <FormButton label="Reset Password" class="my-4 h-min-50" @click.prevent="handleSubmission"/>
      <FormButton label="Go back to login" class="mt-4 h-min-50" buttonType='outline' @click="goBackToLogin"/>

      <AuthSocialLogin/>

      <div class="d-flex mt-4 ps-4 ms-2">
        <span class="autLinkText gilroy-regular me-2 my-auto">Don't have an account?</span>
        <a href="/register"><span class="my-auto text-blue fs-15 lh-19 fw-bold">Sign Up</span></a>
      </div>



    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {forgotPasswordForm} from '../validator'
import {requestForPasswordReset} from '../services'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'


let { form, v$ } = forgotPasswordForm();
const router = useRouter()


const {
  isLoading: requestForPasswordResetIsLoading,
  error: requestForPasswordResetError,
  isSuccessful: requestForPasswordResetIsSuccessful,
  execute: executeRequestForPasswordReset,
} = requestForPasswordReset(form);

const handleSubmission = ()=>{
  v$.value.$validate();
  if(v$.value.$invalid) return;
  executeRequestForPasswordReset().then(() => {
    if (requestForPasswordResetIsSuccessful.value) {
      AlertService.fire({
        confirmButtonText: 'Go back to login',
        customClass: {
          confirmButton: 'btn bg-blue border border-0',
        },
        allowOutsideClick:false,
        html:`<div class="d-flex flex-column">
            <div class="icon d-flex wpx-112 hpx-112 border border-black rounded-circle mx-auto mt-4">
              <span class="material-icons fw-100 text-black my-auto mx-auto" style="font-size: 55px;">
                check
              </span>
            </div>
            <div class="message fs-18 lh-21 mx-auto mt-3 px-4 gilroy-regular" style="color:#757575;">
              A password reset email has been sent to your email address. Please wait at least 10 minutes before attempting another reset.
            </div>
          </div>`
      }).then(()=>{
        goBackToLogin()
      })
    }
  })
 }

 const goBackToLogin = ()=>router.push({name:"Auth.Login"})

const serverError = computed(() => {
  return HelperService.getObjectProperty(requestForPasswordResetError, "value.errors", {});
});

</script>


<style lang="scss" scoped>
@import '../style.scss';
</style>