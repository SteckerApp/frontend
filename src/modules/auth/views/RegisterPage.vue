
<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex flex-column mx-auto my-auto authContainer position-absolute overflow-auto hpx-700 wpx-550 bg-white pxpx-70 pypx-25">

      <span class="auth fs-30 lh-35 text-black mt-3">Create an account</span>
      <span class="auth-instruction fs-15 lh-28 mt-3">Kindly input your details</span>

      <hr class="mypx-20 authDivider"/>

      <div class="d-flex mb-3">
        <div class="col-6 pe-1">
          <AuthTextInput 
            element-class="auth-element hpx-50"
            required label="Your first name" 
            v-model="form.first_name" 
            :error-msg="serverError.first_name?.[0] || v$.first_name.$errors[0]?.$message"
          />
        </div>
        <div class="col-6 ps-1">
          <AuthTextInput element-class="auth-element hpx-50" required label="Your last name" v-model="form.last_name" :error-msg="serverError.last_name?.[0] || v$.last_name.$errors[0]?.$message" />
        </div>
      </div>

      <div class="mb-3">
        <AuthTextInput element-class="auth-element hpx-50" required label="Email address" type='email' v-model="form.email" :error-msg="serverError.email?.[0] || v$.email.$errors[0]?.$message"/>
      </div>

      <div class="mb-3">
        <AuthPassword element-class="auth-element hpx-50" required label="Password" v-model="form.password" togglePassword :error-msg="serverError.password?.[0] || v$.password.$errors[0]?.$message"/> 
      </div>

      <div class="d-flex fs-11 lh-13 text-blue-lt-2 gilroy-medium text-nowrap my-2">
        By clicking “Next”, you agree to Spark's 
        <router-link to="/terms-of-service" class="mx-1 text-blue fs-11 lh-13">Terms of service</router-link> and 
        <router-link to="/privacy-policy" class="ms-1 text-blue fs-11 lh-13">Privacy policy.</router-link>
      </div>

      <FormButton label="Next" class="mt-3 h-min-50" :disabled="!form.agree" @click="handleSubmission"/>
      <AuthSocialLogin/>

      <div class="d-flex mt-4 ps-4 ms-2">
        <span class="autLinkText gilroy-regular me-2 my-auto">Already have an account?</span>
        <a href="/login"><span class="my-auto text-blue fs-15 lh-19 fw-bold">Sign in</span></a>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive,computed} from 'vue'
import {useRouter} from 'vue-router'
import {validateRegistrationForm} from '../validator'
import {register} from '../services'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'

 const router = useRouter()

let { form, v$ } = validateRegistrationForm();

 const {
  isLoading: registrationIsLoading,
  response: registrationResponse,
  error: registrationError,
  isSuccessful: registrationIsSuccessful,
  hasError: registrationHasError,
  execute: executeRegistration,
} = register(form);

 const handleSubmission = ()=>{
    v$.value.$validate();
    if(v$.value.$invalid) return;
    executeRegistration().then((res: any) => {
      if (registrationIsSuccessful.value) {
        AlertService.toast('success','Success',res.message)
        router.push({name:"Auth.Email.Verification"})
      }
    })
 }
const serverError = computed(() => {
  return HelperService.getObjectProperty(registrationError, "value.errors", {});
});

</script>


<style lang="scss" scoped>
@import '../style.scss';
</style>