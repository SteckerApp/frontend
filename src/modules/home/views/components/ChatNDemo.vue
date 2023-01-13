<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col d-flex flex-column hpx-500 pypx-100 pxpx-150 bg-blue">
                <i class="material-icons-outlined text-white fs-100">forum</i>
                <div class="fs-45 lh-53 gilroy-medium text-white mt-4">Chat with us</div>
                <div class="fs-20 lh-23 gilroy-regular text-white mt-3">Do you have any questions about how we can help your business grow?</div>
                <span class="mt-auto fs-15 lh-18 gilroy-medium bg-yellow rounded-px-5 perfect-center wpx-229 hpx-46 cursor-pointer mt-3" @click="callModal=true">Drop a message</span>
            </div>
            <div class="col d-flex flex-column hpx-500 pypx-100 pxpx-150 bg-blue-lt-1">
                <i class="material-icons-outlined text-blue-dk-2 fs-100">smart_display</i>
                <div class="fs-45 lh-53 gilroy-medium text-blue mt-4">Wanna know more?</div>
                <div class="fs-20 lh-23 gilroy-regular text-blue-dk-2 mt-3">Get a walkthrough of how Spark works</div>
                <router-link 
                    to="/get-a-demo" 
                    class="text-white text-decoration-none mt-auto fs-15 lh-18 gilroy-medium bg-blue-dk-2 text-white rounded-px-5 perfect-center wpx-229 hpx-46 cursor-pointer mt-3"
                >Request demo
                </router-link>
            </div>
        </div>


        <BookACall :openCallModal="callModal" @modal:closed="callModal = false"/>
    </div>
</template>


<script lang="ts" setup>
    import { ref } from 'vue'
    import BookACall from '@/layouts/components/BookACall'

    const callModal = ref(false);

</script>