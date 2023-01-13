<template>
    <div class="d-flex justify-content-center">

    <div 
      class="d-flex links hpx-58 mx-auto position-absolute text-blue-dk-1 gilroy-medium fs-16 lh-19 rounded-px-30"
      :class="usedInModal ? 'bg-white' : 'bg-blue-lt-1'"
      :style="usedInModal ? 'top:40px' : 'top:420px'"
    >
      <div 
        v-for="(item,i ) in categories" :key="i"
        class="text-center cursor-pointer pxpx-40 pypx-19" 
        :class="{active:currentCategory==item.name}" 
        @click="currentCategory=item.name"
      >{{item.name}}</div>
    </div>

    <div 
      class="plans mx-auto d-flex flex-wrap justify-content-center position-relative"
      :style="usedInModal ? 'top:120px' : 'top:500px'"
    >

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
              v-if="!usedInModal && item.showIcon"
              @mouseover="showMoreInfo=true"
            >?</span>
          </div>

        </div>

          <div class="d-flex flex-column mt-auto">
              <div class="d-flex plan-font gilroy-regular">
              <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">₦</span>
              <span class="fs-18 lh-21 fw-700 text-black plan-font gilroy-regular">{{plan.price}}</span>
              <span class="fs-12 mt-auto lh-19 fw-400 text-black plan-font gilroy-regular">/{{plan.type}}</span>
            </div>
            <FormButton label="Select plan" variant="light" class="mt-2"/>
          </div>
      </div>

      <ModalBox 
        class="h-100" 
        v-model="showMoreInfo" 
        :staticBackDrop="true"
        modal-custom-class="plans-page-class" modalSize="modal-lg" modalWidth="650px"
        @modal:closed="showMoreInfo = false" :modalId="`modal-${Date.now()}`"
        @mouseout="showMoreInfo=false"
      >
      <template #default>
        <div class="d-flex flex-column p-4">
          <span class="fs-25 lh-10 gilroy-medium text-blue text-center">This package only covers designs for</span>
          <div class="d-flex flex-wrap mt-5">
            <div class="fs-15 lh-10 gilroy-regular col-4 col-md-4 col-sm-6 mb-3">Background removal</div>
            <div class="fs-15 lh-10 gilroy-regular col-4 col-md-4 col-sm-6 mb-3">Ebook covers</div>
            <div class="fs-15 lh-10 gilroy-regular col-4 col-md-4 col-sm-6 mb-3">Print Designs</div>
            <div class="fs-15 lh-10 gilroy-regular col-4 col-md-4 col-sm-6 mb-3">Billboards</div>
          </div>
        </div>
      </template>
      </ModalBox>

    </div>
    </div>
</template>


<script lang="ts" setup>
import {reactive,ref,computed, type Ref} from 'vue'
interface PlanProps{
    category: string
    categories: Record<string, any>
    usedInModal?:boolean
}
// eslint-disable-next-line
const props = defineProps<PlanProps>()
// eslint-disable-next-line
const emits = defineEmits(['new:category'])

const showMoreInfo = ref (false)
const categoryPlans = computed(()=>{
  let categoryData = props.categories.find((cat:any)=>cat.name == currentCategory.value);
  return categoryData?.plans as any
})
const currentCategory = computed({
    get(){
        return props.category
    },
    set(newCategory:string){
        emits('new:category', newCategory)
    }
})
</script>

<style lang="scss" scoped>
  .active{
    height: 58px;
    background: var(--spa-color-blue);
    color: var(--spa-color-white);
    border-radius: 30px;
  }
  .plans{
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