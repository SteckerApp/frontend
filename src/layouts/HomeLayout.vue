<template>

    <MainContainer>
        <HomeTopBar />
        <div class="mtpx-71">
            <router-view class="routerView" v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
        <HomeFooter />
    </MainContainer>

</template>

<script lang="ts" setup>
    import MainContainer from './MainContainer.vue';
    import HomeTopBar from './components/HomeTopBar.vue'
    import HomeFooter from './components/HomeFooter.vue'

</script>

<style lang="scss" scoped>
    .routerView{
        min-width: 100vw;
        min-height: calc(100vh - 520px);
    }
</style>