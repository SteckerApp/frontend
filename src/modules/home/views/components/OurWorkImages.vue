<template>
    <div class="our-work-images pypx-70 pxpx-150">
        <div class="d-flex">
            <div class="flex-shrink-0 d-flex align-content-start flex-wrap wpx-400 me-3">
                <span 
                    class="tag cursor-pointer rounded-px-10 fs-20 lh-23 gilroy-regular hpx-44 px-3 py-2 me-3 mb-2" v-for="(cat, i) in categories" :key="i"
                    :class="category==cat.tag ? 'bg-blue text-white' : 'bg-blue-lt-1'"
                    @click="category=cat.tag"
                >
                    {{cat.name}}
                </span>
            </div>
            <div class="flex-grow-1">
                <div class="d-flex flex-wrap">
                    <img :src="require(`@/assets/img/home/works/${image.file}`)" alt="" class="me-3 mb-3 mw-100 h-auto" v-for="(image, i) in images" :key="i"/>
                </div>
                <FormButton label="View more" class="w-90 hpx-60 rounded-px-10 mt-3"/>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
    import { ref, computed } from 'vue'

    const category = ref('all');

    const categories = [
        {name: 'All', tag: 'all'},
        {name: 'Brochures & Flyers', tag: 'brochures_flyers'},
        {name: 'Custom Illustrations', tag: 'custom_illustrations'},
        {name: 'GIFs', tag: 'gifs'},
        {name: 'Logos & Branding', tag: 'logos_branding'},
        {name: 'Motion Graphics', tag: 'motion_graphics'},
        {name: 'Packaging', tag: 'packaging'},
        {name: 'Presentation Design', tag: 'presentation_design'},
        {name: 'Social Media Graphics', tag: 'social_media_graphics'},
    ]

    const workImages = [
        {file: '1.svg', category: 'brochures_flyers'},
        {file: '2.svg', category: 'custom_illustrations'},
        {file: '3.svg', category: 'gifs'},
        {file: '4.svg', category: 'logos_branding'},
        {file: '5.svg', category: 'motion_graphics'},
        {file: '6.svg', category: 'packaging'},
        {file: '7.svg', category: 'presentation_design'},
        {file: '8.svg', category: 'social_media_graphics'},
        {file: '9.svg', category: 'brochures_flyers'},
        {file: '10.svg', category: 'custom_illustrations'},
        {file: '11.svg', category: 'gifs'},
        {file: '12.svg', category: 'logos_branding'},
        {file: '13.svg', category: 'motion_graphics'},
        {file: '14.svg', category: 'packaging'},
        {file: '15.svg', category: 'presentation_design'},
    ]

    const images = computed(()=>{
        if(category.value == 'all'){
            return workImages
        }
        return workImages.filter((image)=>image.category == category.value) || []
    })
</script>