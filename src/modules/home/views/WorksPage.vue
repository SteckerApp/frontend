<template>
    <div>
        <HeroHead>
        <div class="d-flex flex-column pxpx-200">
            <span class="gilroy-medium fs-96 lh-112 text-blue-dk-1">Works</span>
            <span class="gilroy-regular fs-24 lh-28 text-blue-dk-1">We design for a wide range of clients. If you can imagine it, we can design it</span>
        </div>
        </HeroHead>
        <OurWorkImages />
        <BrandComponent />
        <ReadyDemo />
    </div>
</template>


<script lang="ts" setup>
    import OurWorkImages from './components/OurWorkImages'
    import BrandComponent from './components/BrandComponent'
    import ReadyDemo from './components/ReadyDemo'
</script>