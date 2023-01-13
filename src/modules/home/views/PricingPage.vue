<template>
  <div class="bg-secondary-lt-5 position-relative">
    <HeroHead>
      <div class="d-flex flex-column pxpx-200">
        <span class="gilroy-medium fs-96 lh-112 text-blue-dk-1">Pricing</span>
        <span class="gilroy-regular fs-24 lh-28 text-blue-dk-1">Select and pay for a plan that suits your needs. if you want a unique plan for your business, we have got you covered. Contact us</span>
      </div>
    </HeroHead>
    <PlansComponent :category="category" :categories="categories" @new:category="category=$event" is-non-auth/>
  
    <div class="mtpx-650">
      <WhatWeDo />
      <ChatNDemo />
      <FAQComponent />
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import PlansComponent from '@/modules/subscription/views/components/PlansComponent.vue'
  import WhatWeDo from './components/WhatWeDo'
  import ChatNDemo from './components/ChatNDemo'
  import FAQComponent from './components/FAQComponent'




let allPlansItems = [
  {title:'Unlimited graphic design',showIcon:true, type:'basic'},
  {title:'Unlimited logos & branding',showIcon:false, type:'basic'},
  {title:'Unlimited brands',showIcon:false, type:'basic'},
  {title:'Unlimited team members',showIcon:false, type:'basic'},
  {title:'24 hrs turnaround',showIcon:false, type:'basic'},
  {title:'Source files',showIcon:false, type:'basic'},
  {title:'Custom illustrations',showIcon:false},
  {title:'Presentation designs',showIcon:false, type:'standard'},
  {title:'Basic animated gif',showIcon:false, type:'standard'},
  {title:'Designated designer',showIcon:false, type:'standard'},
  {title:'Motion graphics',showIcon:false},
]

const basicPlansItems = computed(()=>allPlansItems.filter((item:any)=>item.type=='basic'))
const standardPlansItems = computed(()=>allPlansItems.filter((item:any)=>item.type))
  const category = ref ('Monthly')
const categories = [
  {
    name:'Monthly',
    plans:[
      {
        title:'M Basic',
        description:'M For day-to-day graphic design needs',
        default:false,
        discounted:null,
        price:'25,000',
        type:'monthly',
        items:basicPlansItems.value,
      },
      {
        title:'M Standard',
        description:'M For day-to-day marketing needs and big campaigns.',
        default:true,
        discounted:null,
        price:'150,000',
        type:'monthly',
        items:standardPlansItems.value,
      },
      {
        title:'M Pro',
        description:'M Covers day-to-day Graphics and motion design for marketing & big campaigns.',
        default:false,
        discounted:'40,999',
        price:'250,000',
        type:'monthly',
        items:allPlansItems,
      },
    ]
  },
  {
    name:'Bi-annually',
    plans:[
      {
        title:'B Basic',
        description:'B For day-to-day graphic design needs',
        default:false,
        discounted:null,
        price:'25,000',
        type:'bi-annually',
        items:basicPlansItems.value,
      },
      {
        title:'B Standard',
        description:'B For day-to-day marketing needs and big campaigns.',
        default:true,
        discounted:null,
        price:'150,000',
        type:'bi-annually',
        items:standardPlansItems.value,
      },
      {
        title:'B Pro',
        description:'B Covers day-to-day Graphics and motion design for marketing & big campaigns.',
        default:false,
        discounted:'40,999',
        price:'250,000',
        type:'bi-annually',
        items:allPlansItems,
      },
    ]
  },
  {
    name:'Annually',
    plans:[
      {
        title:'A Basic',
        description:'A For day-to-day graphic design needs',
        default:false,
        discounted:null,
        price:'25,000',
        type:'annually',
        items:basicPlansItems.value,
      },
      {
        title:'A Standard',
        description:'A For day-to-day marketing needs and big campaigns.',
        default:true,
        discounted:null,
        price:'150,000',
        type:'annually',
        items:standardPlansItems.value,
      },
      {
        title:'A Pro',
        description:'A Covers day-to-day Graphics and motion design for marketing & big campaigns.',
        default:false,
        discounted:'40,999',
        price:'250,000',
        type:'annually',
        items:allPlansItems,
      },
    ]
  },
]

</script>