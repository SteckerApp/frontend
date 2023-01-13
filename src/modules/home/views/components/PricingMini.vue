<template>

    <div class="pricing-mini pypx-70 pxpx-150 mtpx-90">
        <div class="d-flex flex-column">
            <div class="fs-60 lh-70 gilroy-medium text-center mb-3 text-white">Pricing</div>
            <div class="fs-30 lh-35 gilroy-regular text-center mb-5 text-white">One flat monthly fee. No contracts, no hidden fees, no stress of finding a great designer.</div>
            <div class="d-flex flex-wrap mx-auto">


                <div class="d-flex flex-column bg-secondary-lt-5 rounded-px-20 wpx-320 hpx-450 me-3 mb-4 px-4 py-4" v-for="(price, i) in pricing" :key="i">
                    <div class="fs-30 lh-35 gilroy-medium text-blue-dk-2 text-center mt-5">{{price.title}}</div>
                    <div class="fs-20 lh-23 gilroy-regular text-secondary-lt-4 text-center mt-2 mb-5">{{price.description}}</div>
                    <div class="d-flex flex-column mt-auto mb-4">
                        <div class="fs-40 lh-47 gilroy-bold text-blue text-center mb-2">N{{price.amount}}/mo</div>
                        <!-- <span class="fs-20 lh-23 gilroy-medium bg-yellow rounded-px-10 perfect-center wpx-232 hpx-54 mx-auto cursor-pointer">Learn more</span> -->
                        <router-link 
                            to="/pricing" 
                            class="fs-20 lh-23 gilroy-medium bg-yellow text-black text-decoration-none rounded-px-10 perfect-center wpx-232 hpx-54 mx-auto cursor-pointer"
                        >Learn more
                        </router-link>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
    const pricing = [
        {title: "Basic", description: "For day-to-day graphic design needs", amount: "100,000"},
        {title: "Standard", description: "For day-to-day marketing needs and big campaigns.", amount: "200,000"},
        {title: "Pro", description: "Covers day-to-day Graphics and motion design needs for marketing and big campaigns.", amount: "350,000"},
    ]
</script>


<style lang="scss" scoped>
    .pricing-mini{
        background-image: url(@/assets/img/home/pricing-mini.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>