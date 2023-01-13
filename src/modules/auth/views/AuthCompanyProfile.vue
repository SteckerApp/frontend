
<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex flex-column mx-auto my-auto container authContainer position-absolute overflow-auto hpx-700 wpx-1000 bg-white pxpx-90 pypx-70">

      <span class="auth fs-30 lh-35 text-black mt-3 mx-auto text-center">Complete your company profile!</span>
      <span class="auth-instruction fs-15 lh-28 mt-1 mx-auto">Let us get to kow about your business</span>
      <input ref="fileUpload" type="file" id="file-upload" @change="handleFileUpload" class="d-none" accept="image/png, image/jpeg"/>

      <div class="row mt-5">
        <div class="companyLeft col-lg-6 col-md-12 col-sm-12 pe-5">
          <div class="d-flex mb-3">
            <span class="auth-instruction fs-15 lh-28 mt-1 me-4">Company photo</span>
            <span class="auth-instruction fs-15 lh-28 mt-1 me-4 pe-2">or</span>
            <span class="auth-instruction fs-15 lh-28 mt-1">Select an avatar</span>
          </div>
          <div class="d-flex">
            <span v-if="previewCompanyImageURL" @click="(fileUpload! as HTMLInputElement).click()">
              <img :src="previewCompanyImageURL" class="wpx-130 hpx-130 rounded-circle cursor-pointer"/>
            </span>
            <span v-else @click="(fileUpload! as HTMLInputElement).click()">
              <img src="@/assets/img/no-image.svg" class="border wpx-130 hpx-130 rounded-circle cursor-pointer"/>
            </span>
            <div class="d-flex justify-content-end flex-wrap">
              <span><img src="@/assets/img/auth/avatar1.svg" class="wpx-65 hpx-65 rounded-circle cursor-pointer mb-1 me-1"/></span>
              <span><img src="@/assets/img/auth/avatar2.svg" class="wpx-65 hpx-65 rounded-circle cursor-pointer mb-1 me-1"/></span>
              <span><img src="@/assets/img/auth/avatar3.svg" class="wpx-65 hpx-65 rounded-circle cursor-pointer mb-1"/></span>
              <span><img src="@/assets/img/auth/avatar4.svg" class="wpx-65 hpx-65 rounded-circle cursor-pointer mb-1 me-1"/></span>
              <span><img src="@/assets/img/auth/avatar5.svg" class="wpx-65 hpx-65 rounded-circle cursor-pointer mb-1 me-1"/></span>
              <span><img src="@/assets/img/auth/avatar6.svg" class="wpx-65 hpx-65 rounded-circle cursor-pointer mb-1"/></span>
            </div>
          </div>
          <div class="mt-3"><AuthTextInput element-class="auth-element hpx-50" label="Company name" placeholder="Please enter company name" v-model="form.name"/></div>
        </div>
        <div class="companyRight col-lg-6 col-md-12 col-sm-12 ps-5 border-start">
          <div><AuthTextInput element-class="auth-element hpx-50" label="Location" placeholder="eg Lagos, Nigeria" v-model="form.description"/></div>
          <!-- <div class="mt-4"><AuthTextInput label="How did you hear about us?" placeholder="Please select" v-model="form.how"/></div> -->
          <div class="mt-4">
            <FormLabel
              label="How did you hear about us?"
              fieldId="how-you-hear"
            />
            <select v-model="form.hear_about_us" class="form-select form-select-lg auth-element" required>
              <option value="" disabled selected>Please select</option>
              <option :value="how" v-for="(how,i) in HEAR_ABOUT_US" :key="i">{{how}}</option>
            </select>
          
          </div>
          <div class="mt-4 mb-3"><AuthTextInput element-class="auth-element hpx-50" label="Best number to reach you  (For customer support)" placeholder="090912345567" v-model="form.phone_number" acceptNumberOnly/></div>
        </div>
      </div>

      <div class="row justify-content-end">
        <div class="submitBtn col-lg-6 col-md-12 col-sm-12 ps-5 d-grid gap-2">
          <FormButton label="Save & Continue" class="mt-4 h-min-50" @click.prevent="handleSubmission"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive,ref,computed, type Ref} from 'vue'
import {useRouter} from 'vue-router'
import {CompanyDetailsForm} from '../types'
import {storeCompanyDetails} from "../services"
import * as HelperService from '@/services/helper-service'
import * as AlertService from '@/services/alert-service'
import {HEAR_ABOUT_US} from '@/globals/const'


const router = useRouter()
let form:CompanyDetailsForm = reactive({
  name:"",
  phone_number:"",
  description:"",
  hear_about_us:"",
  avatar:''
})

const fileUpload = ref(null)
const previewCompanyImageURL:Ref<string | null> = ref(null)
const handleFileUpload = (evt:Event) =>{
  let files = (evt.target as HTMLInputElement)?.files
  if (!files) return;
  form.avatar = files[0]
  previewCompanyImageURL.value = URL.createObjectURL(files[0])
}



 const {
  isLoading: storingCompanyIsLoading,
  response: storingCompanyResponse,
  error: storingCompanyError,
  isSuccessful: storingCompanyIsSuccessful,
  hasError: storingCompanyHasError,
  execute: executeStoringCompany,
} = storeCompanyDetails(new FormData());

const handleSubmission = ()=>{
  let formData = new FormData();
  formData.append('name',form.name as string)
  formData.append('phone_number',form.phone_number as string)
  formData.append('description',form.description as string)
  formData.append('hear_about_us',form.hear_about_us as string)
  if(form.avatar){
    formData.append('avatar',form.avatar as File)
  }
  executeStoringCompany({ data: formData }).then((res:any)=>{
    if (storingCompanyIsSuccessful.value) {
      AlertService.toast('success','Success',res.message)
      router.push({name:"Subscription.Plans"})
    }
  })
}

</script>


<style lang="scss" scoped>
@import '../style.scss';
  .border-start{
    border-left: 1px solid #E6E6E6;
  }
  
  select:required:invalid {
    color: #666;
    font-size: 16px;
  }
  option[value=""][disabled] {
    display: none;
  }

@media (max-width: 992px) {
  .companyLeft{
    padding-right: calc(var(--bs-gutter-x) * 0.5)!important;
  }
  .companyRight{
    border-left: none!important;
    padding-left: calc(var(--bs-gutter-x) * 0.5)!important;
    margin-top: 20px;
  }
  .submitBtn{
    padding-left: calc(var(--bs-gutter-x) * 0.5)!important;
  }
}
</style>