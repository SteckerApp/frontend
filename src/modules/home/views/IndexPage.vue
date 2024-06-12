<template>
    <div class="position-relative">
        <img src="@/assets/img/home/home-side-shadow.svg" alt="" class="home-side-shadow position-absolute start-0"/>
        <IntroComponent/>
        <BrandComponent/>
        <ClientsStatement :slides="slides"/>
        <!-- <ClientsStatementMock :slides="slidesMock"/> -->
        <PricingMini/>
        <OurWorks/>
        <OfferComponent/>
        <HowItWorks/>
        <ChatNDemo />
        <RecentBlog />
    </div>
</template>

<script lang="ts" setup>
    import IntroComponent from './components/IntroComponent.vue'
    import BrandComponent from './components/BrandComponent.vue'
    import ClientsStatement from './components/ClientsStatement.vue'
    // import ClientsStatementMock from './components/ClientsStatementMock.vue'
    import PricingMini from './components/PricingMini.vue'
    import OurWorks from './components/OurWorks.vue'
    import OfferComponent from './components/OfferComponent.vue'
    import HowItWorks from './components/HowItWorks.vue'
    import ChatNDemo from './components/ChatNDemo.vue'
    import RecentBlog from './components/RecentBlog.vue'
    import {getComments} from '../services'
    import {ref, onMounted} from 'vue'

    // const slidesMock = [
    //     {id:1, name:'Michael Jones', position:'Head of Sales, Vezeeta', comment: '“Great and exemplary service from start to finish. Thank you for your continued patience and uninhibited willingness to make corrections.”'},
    //     {id:2, name:'Elena Sarah', position:'Head of Sales, Vezeeta', comment: '“Great and exemplary service from start to finish. Thank you for your continued patience and uninhibited willingness to make corrections.”'},
    //     {id:3, name:'John Thomas', position:'Head of Sales, Vezeeta', comment: '“Great and exemplary service from start to finish. Thank you for your continued patience and uninhibited willingness to make corrections.”'},
    //     {id:4, name:'James Micheal', position:'Head of Sales, Vezeeta', comment: '“Great and exemplary service from start to finish. Thank you for your continued patience and uninhibited willingness to make corrections.”'},
    // ]

    const slides = ref([] as any)



    const {
        execute: executeGetCommentData,
    } = getComments();



    onMounted(()=>{
        executeGetCommentData().then((res:any)=>{
            slides.value = res?.data.map((comment: any)=>{
                comment.name = comment.user?.first_name + ' ' + comment.user?.last_name
                comment.position = comment?.role || 'No Position Yet'
                return comment;
            })
        })
    })
</script>
