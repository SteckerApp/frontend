<template>
    <div class="intro pypx-70 pxpx-150">
        <div class="row">
            <div class="col ptpx-70 mb-5">
                <div class="gilroy-medium fs-48 lh-56 text-blue-dk-1 text-wrap mb-1">Your Unlimited Design Team</div>
                <div class="gilroy-regular fs-24 lh-36 text-blue-dk-1 text-wrap">Get access to unlimited graphic design and motion graphics for your business at a flat rate without having to hire your own designer</div>
                <div class="d-flex mt-2">
                    <router-link 
                        to="/register" 
                        class="create-btn perfect-center text-decoration-none fs-15 lh-19 bg-blue gilroy-bold text-white wpx-210 hpx-44 rounded-px-5 me-3 cursor-pointer"
                    >CREATE ACCOUNT
                    </router-link>
                    <router-link 
                        to="/get-a-demo" 
                        class="perfect-center text-decoration-none fs-15 lh-19 bg-white border border-blue gilroy-bold text-blue wpx-210 hpx-44 rounded-px-5 me-3 cursor-pointer"
                    >SEE HOW IT WORKS
                    </router-link>
                </div>
            </div>
            <div class="col">
                <img src="@/assets/img/home/intro.png" alt=""/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    ::v-deep(.create-btn){
        z-index: 1;
    }
</style>