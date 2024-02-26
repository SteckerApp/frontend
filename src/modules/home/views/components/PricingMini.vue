<template>

    <div class="pricing-mini mt-5 bg-blue">

        <div class="container">
            <div class="title mx-auto mb-3 text-center text-white">Pricing</div>
            <div class="details text-center mb-5 text-white mx-auto">One flat monthly fee. No contracts, no hidden fees, no stress of finding a great designer.</div>



            <div class="row justify-content-center">

              <div class="col-lg-4 col-md-6" v-for="(price, i) in pricing" :key="i">

                <div class="pricing-card d-flex flex-column bg-secondary-lt-5 rounded-px-20 hpx-450 mb-4 px-4 py-4 mx-auto">
                    <div class="pricing-title text-blue-dk-2 text-center mt-5">{{ price.title }}</div>
                    <div class="pricing-description text-center mx-auto text-secondary-lt-4 text-center mt-2 mb-5">{{ price.description }}</div>
                    <div class="d-flex flex-column mt-auto mb-4">
                        <div class="fs-32 lh-33 gilroy-bold text-blue text-center mb-2">{{ formatMoney(price.amount) }}/mo</div>
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

    </div>
</template>

<script lang="ts" setup>
    import { formatMoney } from '@/services/helper-service'
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
        padding-top: 150px;
        padding-bottom: 200px;
        
    }



    .title{
        font-size: 60px;
        font-family: gilroy-medium;
    }

    .details{
        font-size: 30px;
        max-width: 766px;
    }

    .pricing-title{
        font-size: 30px;
        line-height: 35px;
        font-family: gilroy-medium;
    }
    .pricing-description{
        font-size: 20px;
        line-height: 23px;
        font-family: gilroy-regular;
    }

    @media (max-width: 500px) {
        .title{
            font-size: 40px;
            font-family: gilroy-bold;
        }

        .details{
            font-size: 30px;
        }
    }
    @media (min-width: 1200px) {
        .pricing-description{
            max-width: 292px;
        }
        .pricing-card{
            max-width: 340px;
        }
        .pricing-mini {
            padding: 150px 150px 200px
        }
    }
</style>