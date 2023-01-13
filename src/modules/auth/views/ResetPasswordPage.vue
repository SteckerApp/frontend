
<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex flex-column mx-auto my-auto authContainer position-absolute hpx-700 wpx-500 bg-white pxpx-70 pypx-100">
      <span class="auth fs-30 lh-35 text-black mt-3">Reset Password</span>
      <span class="auth-instruction fs-16 lh-28 mt-3">Enter your new Password</span>

      <hr class="mypx-20 authDivider"/>


      <div class="mb-3">
        <AuthPassword element-class="auth-element" required label="Password" v-model="form.password" togglePassword :error-msg="serverError.password?.[0] || v$.password.$errors[0]?.$message"/> 
      </div>

      <div class="mb-2">
        <AuthPassword element-class="auth-element" required label="Confirm Password" v-model="form.password_confirmation" togglePassword :error-msg="serverError.password_confirmation?.[0] || v$.password_confirmation.$errors[0]?.$message"/> 
      </div>
      <FormButton label="Reset Password" class="mt-3 h-min-50" @click="handleSubmission"/>

      <div class="d-flex mt-5 ps-4 ms-2">
        <span class="autLinkText gilroy-regular me-2 my-auto">Remember your password?</span>
        <a href="/login"><span class="my-auto text-blue fs-15 lh-19 fw-bold">Login in</span></a>
      </div>



    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {validateResetPasswordForm} from '../validator'
import {resetPassword} from '../services'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'


const route = useRoute()
const router = useRouter()

let { form, v$ } = validateResetPasswordForm();

form.email = (route.params.email || route.query?.email)  as string;
form.token = route.params.token as string;

const {
  isLoading: resetPasswordIsLoading,
  error: resetPasswordError,
  isSuccessful: resetPasswordIsSuccessful,
  execute: executeResetPassword,
} = resetPassword(form);

 const handleSubmission = ()=>{
    v$.value.$validate();
    if(v$.value.$invalid) return;
    executeResetPassword().then((res: any) => {
      if (resetPasswordIsSuccessful.value) {
        AlertService.toast('success','Success',res.message)
        router.push({name:"Auth.Login"})
      }
    })
 }
const serverError = computed(() => {
  return HelperService.getObjectProperty(resetPasswordError, "value.errors", {});
});

</script>


<style lang="scss" scoped>
@import '../style.scss';
</style>