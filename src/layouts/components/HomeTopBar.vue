<template>
    <div class="d-flex justify-content-between align-items-center hpx-70 bg-blue-lt-1 pxpx-150 fixed-top">
        <router-link to="/" class="fs-32 lh-38 gilroy-bold text-blue cursor-pointer text-decoration-none">spark</router-link>
        <div class="d-flex align-items-center">
            <div class="home-links d-flex my-auto me-5">
                <router-link  
                    v-for="(link, i) in links" :key="i"
                    :to="link.path" 
                    class="fs-10 lh-12 gilroy-bold me-4 cursor-pointer text-uppercase"
                    :class="link.current ? 'text-blue' : 'text-blue-dk-1'"
                >
                    {{link.title}}
                </router-link>
            </div>
            <router-link to="/get-a-demo" class="demo-link bg-blue perfect-center rounded-px-10 wpx-92 hpx-32 text-white fs-10 lh-12 gilroy-bold cursor-pointer">GET A DEMO</router-link>
        </div>
    </div>
</template>


<script lang="ts" setup>
    import { computed } from 'vue'
    import { useRoute, RouterLink } from 'vue-router'
    const route = useRoute();

    const linksArr = [
        {title: "Works", path: "/works", current: false},
        {title: "Pricing", path: "/pricing", current: false},
        {title: "Become an affiliate", path: "/affiliate", current: false},
        {title: "Login", path: "/login", current: false},
        {title: "Create an account", path: "/register", current: false},
    ]
    const links = computed(()=>{
        const modifiedLiks = linksArr.map((link)=>{
            link.current = false
            if(link.path == route.path){
                link.current = true
            }
            return link
        })
        return modifiedLiks
    })
</script>


<style lang="scss" scoped>
    .home-links a, a.demo-link{
        text-decoration: none;
    }
</style>