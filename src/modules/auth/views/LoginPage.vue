
<template>
  <div class="d-flex justify-content-center">


    <div class="mx-auto my-auto authContainer wpx-500 bg-white ppx-70">
      
        <div class="d-flex flex-column" v-if="showUserAccounts && userAccounts.length">
          <span class="accounts gilroy-medium fs-23 lh-26 text-black mt-3 mb-5">Choose or Add another account</span>

          <div class="d-flex flex-column" v-for="(user,i) in userAccounts" :key="i">
            <hr class="mypx-20 bg-yellow-lt-1" v-if="i"/>
            <div class="d-flex cursor-pointer" @click="selectUserAccount(user)">
              <UserAvatar 
                class="my-auto"
                size="104" 
                :src="user.avatar"
              />
              <div class="d-flex flex-column my-auto ms-3">
                <span class="gilroy-medium fs-20 lh-23 text-blue-dk-1 text-wrap">{{user.firstName}} {{user.lastName}}</span>
                <span class="gilroy-regular fs-16 lh-19 text-blue-lt-2 mt-2 text-wrap">{{user.email}}</span>
              </div>
            </div>
          </div>
          <FormButton label="Login to another account" class="mt-4 h-min-50" @click="showUserAccounts=false"/>
        

        </div>
        
        <div class="d-flex flex-column" v-else>
          <span class="auth fs-30 lh-35 text-black mt-3">Welcome back 👋🏾</span>
          <span class="auth-instruction fs-15 lh-28 mt-3">Enter your email and password</span>

          <hr class="mypx-20 authDivider"/>


          <div class="mb-3">
            <AuthTextInput element-class="auth-element hpx-50" required label="Email address" type="email" v-model="form.email" :error-msg="serverError.email?.[0] || v$.email.$errors[0]?.$message"/>
          </div>

          <div class="mb-2">
            <AuthPassword element-class="auth-element hpx-50" required label="Password" v-model="form.password" togglePassword :error-msg="serverError.password?.[0] || v$.password.$errors[0]?.$message"/> 
          </div>
          <a href="/forgot-password"><span class="d-flex justify-content-end text-blue fs-16 lh-19">Forgot password?</span></a>
          <FormButton label="Login" class="mt-4 h-min-50" @click="handleSubmission"/>
          <AuthSocialLogin/>

          <div class="d-flex mt-4 ps-4 ms-2">
            <span class="autLinkText gilroy-regular me-2 my-auto">Don't have an account?</span>
            <a href="/register"><span class="my-auto text-blue fs-15 lh-19 fw-bold">Sign Up</span></a>
          </div>

        </div>


    </div>


  </div>
</template>

<script lang="ts" setup>
import {computed,ref} from 'vue'
import {useRouter} from 'vue-router'
import {login} from '../services'
import {validateLoginForm} from '../validator'
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'
import AuthService from '@/services/auth-service'
import {setCurrentUserAccount} from '../helpers'



//User accounts
const showUserAccounts = ref(true)
const userAccounts = AuthService.getUserAccounts() || []
const selectUserAccount = (user:any) =>{
  setCurrentUserAccount(user)
  router.push({name:"Clients.Dashboard"})
}


// Login
let { form, v$ } = validateLoginForm();
const router = useRouter()

const {
  isLoading: loginIsLoading,
  error: loginError,
  isSuccessful: loginIsSuccessful,
  execute: executeLogin,
} = login(form);

const handleSubmission = ()=>{
    v$.value.$validate();
    if(v$.value.$invalid) return;
    executeLogin().then((res: any) => {
      if (loginIsSuccessful.value) {
        AlertService.toast('success','Success',res.message)
        router.push({name:"Clients.Dashboard"})
      }
    })
 }

const serverError = computed(() => {
  return HelperService.getObjectProperty(loginError, "value.errors", {});
});

</script>


<style lang="scss" scoped>
  @import '../style.scss';
  .authContainer{
    min-height:500px;
  }
</style>