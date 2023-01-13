<template>
    <MainContainer class="mypx-60">
        <img src="../assets/img/auth/auth-top-right.svg" class="topImage" v-if="!route?.meta?.hideTopImage"/>
        <div class="authLogo fs-50 lh-59 position-absolute gilroy-bold text-blue" v-if="!route?.meta?.hideLogo">spark</div>
        <router-view class="w-100 routerView" v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
        <img src="../assets/img/auth/auth-bottom-left.svg" class="bottomImage" v-if="!route?.meta?.hideBottomImage"/>
    </MainContainer>
</template>



<script lang="ts" setup>
    import {ref,watch,computed} from 'vue'
    import MainContainer from './MainContainer.vue';
    import {useRoute} from 'vue-router'

    const route = useRoute()
</script>


<style lang="scss">
    body{
        background: linear-gradient(0deg, #F7F7FB, #F7F7FB), #F4F4F4!important;
    }
</style>

<style lang="scss" scoped>
.routerView{
    min-height: 700px;
}
.authLogo{
    left: 6.32%;
    top: 10.3%;
    z-index: 10;
}

.topImage{
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: -1000;
}
.bottomImage{
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: -1000;
}

@media (max-width: 950px) {
  .authLogo {
    display: none;
  }
}

@media (min-width: 768px) {}

@media (min-width: 992px) {}
@media (min-width: 1200px) {}

@media (min-width: 1400px) {}
</style>