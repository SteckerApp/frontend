<template>
  <div>
    <HeroHead>
      <div class="pricing-intro">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 pt-5 pt-lg-0 d-flex flex-column justify-content-center">
              <div class="title fw-bold gilroy-medium mb-3 text-blue-dk-1 text-uppercase">Pricing</div>
              <div class="details gilroy-regular lead-text text-blue-dk-1">Select and pay for a plan that suits your needs. if you want a unique plan for your business, we have got you covered. Contact us</div>
            </div>

          </div>
        </div>
      </div>
    </HeroHead>
    <PlansComponent :category="category" :categories="categories" @new:category="category=$event" is-non-auth/>
  
    <div class="mtpx-10">
      <PricingBox />
      <ChatNDemo />
      <FAQComponent />
    </div>
  </div>
</template>


<script lang="ts" setup>
import { type Ref, ref, computed, onMounted } from 'vue'
  import PlansComponent from '@/modules/client-subscription/views/components/PlansComponent.vue'
  import PricingBox from './components/PricingBox.vue'
  import ChatNDemo from './components/ChatNDemo.vue'
  import FAQComponent from './components/FAQComponent.vue'
  import { getSubscription } from '../services'

const {
  isLoading: subscriptionIsLoading,
  execute: executeGetSubscription,
} = getSubscription();


let category: Ref<any> = ref('')
let categories: Ref<any> = ref([])

onMounted(() => {
  executeGetSubscription().then((res: any) => {
    
    for(let category in res.data){
      let plans = res.data[category].map((plan: any) => {
        //plan.items = JSON.parse(plan.metadata)
        plan.items = plan.metadata
        return plan
      })
      let cat = {
        name: category.charAt(0).toUpperCase() + category.slice(1),
        plans: plans
      }
      categories.value.push(cat)
    }

    if (categories.value) {
      category.value = categories.value?.[0].name.charAt(0).toUpperCase() + categories.value?.[0].name.slice(1)
    }

  })
})

</script>

<style lang="scss" scoped>
.title {
  font-size: calc(2rem + .3vw);
}

@media (min-width: 1024px) {
  .title{
    font-size: calc(3.75rem + .3vw);
  }
}



@media (max-width: 1024px) {  
    .pricing-intro{
      padding-top: 60px;
      padding-bottom: 90px;
    }
}

@media (max-width: 500px) {  
    .title, .details {
      text-align: center;
    }
    .pricing-intro{
      padding-top: 30px;
      padding-bottom: 90px;
    }
}

@media (min-width: 1200px) {  
    .pricing-intro{
      padding: 100px 150px
    }
}

</style>