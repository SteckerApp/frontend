<template>
    <div>
        <div class="position-relative">
            <HeroHead>
                <div class="gilroy-medium pxpx-200 fs-60 lh-70 text-blue-dk-1 text-center">How would you like to explore Spark?</div>
            </HeroHead>
            <div class="getADemo d-flex justify-content-center position-relative">
                <div class="d-flex flex-column pxpx-50 pypx-65 bg-white wpx-485 hpx-305 rounded-px-25 me-5">
                    <span class="fs-13 lh-16 gilroy-regular mb-2">View it yourself with a</span>
                    <span class="fs-20 lh-23 gilroy-medium mb-2">Video Demo</span>
                    <span class="fs-13 lh-16 gilroy-regular mb-5">Checkout out how Spark works on your own with our 5-minute demo video.</span>
                    <router-link 
                        to="/watch-demo-form" 
                        class="perfect-center text-white text-decoration-none fs-15 lh-19 bg-blue gilroy-bold text-white wpx-200 hpx-42 px-3 rounded-px-10"
                    >Watch a demo
                    </router-link>
                </div>
                <div class="d-flex flex-column pxpx-50 pypx-65 bg-blue wpx-485 hpx-305 rounded-px-25 text-white">
                    <span class="fs-13 lh-16 gilroy-regular mb-2">Have some talk with you through a</span>
                    <span class="fs-20 lh-23 gilroy-medium mb-2">Personalized tour</span>
                    <span class="fs-13 lh-16 gilroy-regular mb-5">We'll show you around Spark app, and answer any questions you may have</span>
                    <FormButton label="Book a call" variant="yellow" class="wpx-200 hpx-42 px-3 rounded-px-10"/>
                </div>
            </div>
        </div>
        <BrandComponent />
        <ReadyDemo />
    </div>
</template>

<script lang="ts" setup>
    import BrandComponent from './components/BrandComponent'
    import ReadyDemo from './components/ReadyDemo'
</script>

<style lang="scss" scoped>
    .getADemo{
        top: -100px
    }
</style>