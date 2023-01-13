<template>

    <div class="how d-flex flex-column">

        <div class="bg-blue-dk-1 d-flex flex-column pypx-70 pxpx-150">
            <div class="fs-60 lh-70 gilroy-medium text-center text-white mb-5">Here is how it works</div>

            <div class="d-flex flex-wrap mx-auto">

                <div class="d-flex flex-column bg-white rounded-px-30 wpx-280 me-3 mb-4 px-3 py-4" v-for="(how, i) in howItWorks" :key="i">
                    <span class="wpx-100 hpx-100 perfect-center rounded-circle bg-blue-lt-1 text-blue-dk-1 mx-auto">
                        <i class="material-icons fs-60">{{how.icon}}</i>
                    </span>
                    <div class="d-flex mt-5">
                        <span class="fs-60 lh-70 gilroy-bold text-blue-dk-1 me-4">{{i+1}}.</span>
                        <span class="fs-30 lh-35 gilroy-regular text-blue-dk-1">{{how.title}}</span>
                    </div>
                    <div class="fs-18 lh-21 gilroy-regular text-blue-dk-1 mt-3">{{how.description}}</div>
                </div>

            </div>
        </div>

        <ChatNDemo/>

    </div>

</template>


<script lang="ts" setup>
    import ChatNDemo from './ChatNDemo'
    const howItWorks = [
        {
            icon: "edit_note", 
            title: "Make your request", 
            description: "Send in a brief detailing your design need to instantly get matched to a designer."
        },
        {
            icon: "auto_fix_high", 
            title: "We go do our magic", 
            description: "Your designer get to work right away"
        },
        {
            icon: "schedule_send", 
            title: "You receive your design", 
            description: "Your designer delivers your design within the agreed-upon turnaround time and will review with you till it's perfect for you."
        },
    ]
</script>


<style lang="scss" scoped>
</style>