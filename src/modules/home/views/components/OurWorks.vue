<template>
    <div class="works d-flex flex-column pypx-70 pxpx-150 position-relative">
        <div class="fs-60 lh-70 gilroy-medium mx-auto mb-5">Our works</div>
        <!-- <img src="@/assets/img/home/our-works.svg" alt="" class="mw-100 h-auto"/> -->
        <img src="@/assets/img/home/our-works.svg" alt="" class="mx-auto"/>
        <router-link 
            to="/works" 
            class="text-black text-decoration-none seeMore fs-25 lh-29 gilroy-medium bg-yellow rounded-px-10 perfect-center wpx-358 hpx-85 cursor-pointer"
        >See more design samples
        </router-link>
    </div>
</template>


<style lang="scss" scoped>
    .seeMore{
        position: absolute;
        right: 255px;
        bottom: 75px;
    }
</style>