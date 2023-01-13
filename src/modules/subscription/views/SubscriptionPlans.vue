
<template>
  <div class="d-flex justify-content-center pbpx-500">
    <HeroHead is-not-home>
      <div class="d-flex">
        <span @click="router.go(-1)" class="material-icons me-3 my-auto text-black cursor-pointer">west</span>
        <span class="gilroy-medium fs-60 lh-70 text-black my-auto">Choose preferred plan</span>
      </div>
    </HeroHead>
    <div class="d-flex links bg-blue-lt-1 hpx-58 mx-auto position-absolute text-blue-dk-1 gilroy-medium fs-16 lh-19 rounded-px-30">
      <div 
        v-for="(cat, i ) in categories" :key="i"
        class="text-center cursor-pointer pxpx-40 pypx-19" 
        :class="{active:category==cat?.name}" 
        @click="category=cat?.name"
      >{{humanize(cat?.name)}}</div>
    </div>

    <div class="plans mx-auto d-flex flex-wrap justify-content-center position-relative">

      <div class="plan d-flex flex-column wpx-260 bg-white mepx-31 pxpx-20 pbpx-20 mbpx-31" v-for="(plan, i) in categoryPlans" :key="i">
        <span class="plan-font gilroy-regular rounded-px-4 ptpx-2 mt-n2 mx-auto text-center text-blue-lt-1 bg-blue wpx-94 hpx-20 fs-12 lh-15 fw-700" v-if="plan.default">Most Popular</span>
        <div class="d-flex justify-content-between" :class="plan.default ? 'mtpx-10' : 'mtpx-22'">
          <span class="text-black flex-grow-1 text-wrap fs-24 lh-28 gilroy-medium">{{plan.title}}</span>
          <span class="plan-font gilroy-regular rounded-px-4 ptpx-2 px-2 text-center text-blue-dk-2 bg-yellow hpx-20 fs-12 lh-15 fw-700 text-nowrap" v-if="plan.discounted">Save ₦{{plan.discounted}}</span>
        </div>
        <span class="text-secondary-lt-4 gilroy-regular fs-11 lh-14">{{plan.description}}</span>
        <div class="plan-items mt-4">

          <div class="plan-item d-flex position-relative mb-2" v-for="(item,i) in plan.items" :key="i">
            <div class="d-flex my-auto">
              <span class="material-icons me-2 mb-auto ptpx-2 fs-12 fw-bold">check</span>
              <span class="mb-auto text-black lh-15 fs-14 gilroy-regular wpx-170">{{item.title}}</span>
            </div>
            <span 
              class="position-absolute cursor-pointer end-0 my-auto rounded-circle wpx-16 hpx-16 bg-yellow text-blue-dk-2 mspx-3 mb-auto fs-9 lh-16 text-center align-middle" 
              v-if="(item.showIcon === 'true')"
              @mouseover="showInfo(item.info)"
            >?</span>
          </div>

        </div>

          <div class="d-flex flex-column mt-auto">
              <div class="d-flex plan-font gilroy-regular">
                <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">₦</span>
                <span class="fs-18 lh-21 fw-700 text-black plan-font gilroy-regular">{{plan.price}}</span>
                <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">/{{plan.type}}</span>
              </div>
            <FormButton label="Select plan" variant="light" class="mt-2 h-min-50" @click="submitToCreateCart(plan.id)"/>
          </div>
      </div>

      <ModalBox 
        class="h-100" 
        v-model="showMoreInfo" 
        :staticBackDrop="true"
        modal-custom-class="Plans" modalSize="modal-lg" modalWidth="650px"
        @modal:closed="showMoreInfo = false" :modalId="`modal-${Date.now()}`"
        @mouseout="showMoreInfo=false"
      >
      <template #default>
        <div class="d-flex flex-column p-4">
          <span class="fs-25 lh-10 gilroy-medium text-blue text-center">This package only covers designs for</span>
          <div class="d-flex flex-wrap mt-5">
            <div class="fs-15 lh-10 gilroy-regular col-4 col-md-4 col-sm-6 mb-3" v-for="(info, i) in modalInfo" :key='i'>{{info.title}}</div>
          </div>
        </div>
      </template>
      </ModalBox>

    </div>

  </div>
 
</template>

<script lang="ts" setup>
import {reactive,ref,computed,onMounted, type Ref} from 'vue'
import {useRouter} from 'vue-router'
import {getSubscription,createCart} from '../services'


const router = useRouter()

const showMoreInfo = ref (false)
const modalInfo = ref ([] as any)

let category:Ref<any> = ref ('')
let categories:Ref<any> = ref([])

const {
  isLoading: subscriptionIsLoading,
  execute: executeGetSubscription,
} = getSubscription();

const {
  isLoading: createCartIsLoading,
  isSuccessful: createCartIsSuccessfully,
  execute: executeCreateCart,
} = createCart(0);

onMounted(()=>{
  executeGetSubscription().then((res:any)=>{
    console.log(res.data)
    categories.value = res.data
    if(res.data){
      category.value = res.data?.[0].name
    }
  })
})

const  humanize = (str:any) => {
  let name = str.split('_').join(' ').split('-').join(' ');
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const showInfo = (info:any) =>{
  modalInfo.value = info
  showMoreInfo.value=true
}

const categoryPlans = computed(()=>{
  let categoryPlans = []
  let categoryData = categories.value.find((cat:any)=>cat.name == category.value)
  if(categoryData?.name){
    categoryPlans = categoryData.plans.map((plan:any)=>{
      plan.items = JSON.parse(plan.metadata)
      return plan
    })
  }
  return categoryPlans
})

const submitToCreateCart = (subscriptionId:number) => {
  executeCreateCart({data:{subscription_id:subscriptionId}}).then((res:any)=>{
    if(createCartIsSuccessfully.value){
      router.push({name:"Subscription.Cart"})
    }
  })
}


</script>


<style lang="scss" scoped>
@import '../style.scss';
  .links{
    top:420px
  }
  .active{
    height: 58px;
    background: var(--spa-color-blue);
    color: var(--spa-color-white);
    border-radius: 30px;
  }
  .plans{
    top: 500px;
    .plan{
      min-height: 500px;
      border-radius: 24px;
      .plan-font{
        font-style: normal;
        opacity: 0.96;
      }
      .plan-items{
        min-height: 300px;
        letter-spacing: -0.02em;
      }
    }
  }
</style>

