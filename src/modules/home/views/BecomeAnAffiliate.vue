<template>
    <div class="bg-blue-dk-3 pypx-90">

        <div class="d-flex justify-content-between mb-3">
            <div class="text-white pspx-80 pepx-20 ptpx-150 position-relative">
                <img src="@/assets/img/home/affiliate/coin-1.svg" alt="" class="position-absolute start-0"/>
                <div class="gilroy-medium fs-60 lh-70 mb-3">Share Spark & Earn - up to N50,000 monthly!</div>
                <div class="gilroy-regular fs-20 lh-23">Earn N5,000 per month on each client's monthly subscription fee you refer to Spark. As long as they stay subscribed, you will continue to earn</div>
                <div class="d-flex mt-4">
                    <router-link
                        to="/register" 
                        class="perfect-center text-decoration-none fs-15 lh-19 gilroy-medium text-white bg-blue hpx-46 px-4 me-3 rounded-px-8"
                    >Apply now
                    </router-link>
                    <router-link
                        to="/login" 
                        class="perfect-center text-decoration-none fs-15 lh-19 gilroy-medium text-black bg-yellow hpx-46 px-4 me-3 rounded-px-8"
                    >Affiliate login
                    </router-link>
                </div>
            </div>
            <div class="flex-shrink-0">
                <img src="@/assets/img/home/affiliate/affiliate-1.png" alt=""/>
            </div>
        </div>


        <div class="d-flex flex-column pypx-70 position-relative mb-3">
            <img src="@/assets/img/home/affiliate/coin-2.svg" alt="" class="position-absolute end-0 bottom-0 pbpx-100"/>
            <div class="fs-60 lh-70 gilroy-medium text-center text-white mb-5">Extra Income for Everyone</div>

            <div class="d-flex flex-wrap mx-auto">

                <div class="d-flex flex-column bg-white rounded-px-30 wpx-272 me-5 mb-4 px-4 py-4" v-for="(how, i) in howItWorks" :key="i">
                    <span class="wpx-118 hpx-118 perfect-center rounded-circle bg-blue-lt-1 text-blue-dk-1 mx-auto mb-3">
                        <i class="material-icons fs-60">{{how.icon}}</i>
                    </span>
                    <div class="d-flex mt-5">
                        <div class="fs-30 lh-35 gilroy-regular text-blue-dk-1 text-center">{{how.title}}</div>
                    </div>
                    <div class="fs-18 lh-21 gilroy-regular text-blue-dk-1 mt-3 text-center">{{how.description}}</div>
                </div>

            </div>
        </div>


        <div class="d-flex justify-content-between mb-3">
            <div class="text-white pspx-150 pepx-40 position-relative">
                <img src="@/assets/img/home/affiliate/coin-3.svg" alt="" class="position-absolute start-0 bottom-0"/>
                <div class="gilroy-medium fs-60 lh-70 mb-3">Earning with Spark affiliate is super easy</div>

                <div class="d-flex flex-column">
                    
                    <div class="d-flex mb-4">
                        <span class="earn-num gilroy-bold fs-90 lh-105 text-blue-lt-7 my-auto">1</span>
                        <div class="d-flex flex-column my-auto">
                            <span class="gilroy-medium fs-30 lh-35 mb-2">Become an Affiliate</span>
                            <span  class="gilroy-regular fs-18 lh-21">Fill out the Spark Affiliate application form.</span>
                        </div>
                    </div>
                    
                    <div class="d-flex mb-4">
                        <span class="earn-num gilroy-bold fs-90 lh-105 text-blue-lt-7 my-auto">2</span>
                        <div class="d-flex flex-column my-auto">
                            <span class="gilroy-medium fs-30 lh-35 mb-2">Promote Spark</span>
                            <span  class="gilroy-regular fs-18 lh-21">Use your unique referral link to promote Spark.</span>
                        </div>
                    </div>
                    
                    <div class="d-flex mb-4">
                        <span class="earn-num gilroy-bold fs-90 lh-105 text-blue-lt-7 my-auto">3</span>
                        <div class="d-flex flex-column my-auto">
                            <span class="gilroy-medium fs-30 lh-35 mb-2">Earn Cool Cash</span>
                            <span  class="gilroy-regular fs-18 lh-21">For each referral, earn N5,000 from their monthly fee, for as long as they're a customer.</span>
                        </div>
                    </div>

                    <router-link
                        to="/register" 
                        class="perfect-center text-decoration-none fs-15 lh-19 gilroy-medium text-black bg-yellow hpx-70 px-4 me-3 rounded-px-8 wpx-374 ms-5"
                    >Become a Atecker affiliate
                    </router-link>

                </div>
                
            </div>
            <div class="flex-shrink-0 pepx-75">
                <img src="@/assets/img/home/affiliate/affiliate-2.png" alt=""/>
            </div>
        </div>



        <div class="d-flex flex-column pxpx-150 pypx-120 mb-3">
                <div class="gilroy-medium fs-60 lh-70 mb-3 text-white text-center">FAQ</div>

                <div class="bg-blue-lt-8 p-5 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(1)">
                    <span class="gilroy-medium fs-32 lh-35">I just applied, but I haven’t heard back from anyone, why?</span>
                    <span class="gilroy-regular fs-20 lh-24 text-purple-dk-1 mt-2" v-if="currectFaq==1">Well, most likely, we’ve already sent you a few emails back to you.</span>
                </div>

                <div class="bg-blue-lt-8 p-5 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(2)">
                    <span class="gilroy-medium fs-32 lh-35">Where can I get my referral link?</span>
                    <span class="gilroy-regular fs-20 lh-24 text-purple-dk-1 mt-2" v-if="currectFaq==2">Once your registration is successful, log in to your dashboard here: https://affiliate.spark.com/login</span>
                </div>

                <div class="bg-blue-lt-8 p-5 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(3)">
                    <span class="gilroy-medium fs-32 lh-35">What’s your commission structure?</span>
                    <span class="gilroy-regular fs-20 lh-24 text-purple-dk-1 mt-2"  v-if="currectFaq==3">You would receive N5,000 on every referral. As long as your referral remains a customer for that month, you will receive commission and continue to receive a commission for as long as they are a customer of Spark’s.</span>
                </div>

                <div class="bg-blue-lt-8 p-5 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(4)">
                    <span class="gilroy-medium fs-32 lh-35">What do I need to become an affiliate with Spark?</span>
                    <span class="gilroy-regular fs-20 lh-24 text-purple-dk-1 mt-2"  v-if="currectFaq==4">No requirements at all other than a bank account. Whether you run a publication, a YouTube channel, or need a side hustle, as long as you believe Spark is the right fit for your audience, we in turn are the right partner for you!</span>
                </div>

                <div class="bg-blue-lt-8 p-5 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(5)">
                    <span class="gilroy-medium fs-32 lh-35">Is there an earning cap?</span>
                    <span class="gilroy-regular fs-20 lh-24 text-purple-dk-1 mt-2"  v-if="currectFaq==5">Not at all. We have partners who make as little as N5,000 a month to as high as N500,000 a month. This ultimately depends on the reliability of your network and the community you’ve created within your brand. If you know a person, entity, community, or brand that you think we should collaborate with, send an email to hello@spark.com to introduce us!</span>
                </div>

                <div class="bg-blue-lt-8 p-5 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(6)">
                    <span class="gilroy-medium fs-32 lh-35">If I refer customers to you, do I get something?</span>
                    <span class="gilroy-regular fs-20 lh-24 text-purple-dk-1 mt-2"  v-if="currectFaq==6">If you’re an existing customer and want to refer your friends to us, your friend will get a discount and you will receive a percentage of their recurring payment. Send us enough referrals, and you can get our service for FREE. Not to mention, you can also make a little bit of cash on the side.</span>
                </div>

                <div class="bg-blue-lt-8 p-5 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(7)">
                    <span class="gilroy-medium fs-32 lh-35">How will I know when someone signs up using my link?</span>
                    <span class="gilroy-regular fs-20 lh-24 text-purple-dk-1 mt-2"  v-if="currectFaq==7">Easy! The minute someone pays for our any of our services using your link, you will receive an email congratulating you on a successful affiliate subscriber!</span>
                </div>

                <div class="bg-blue-lt-8 p-5 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(8)">
                    <span class="gilroy-medium fs-32 lh-35">How do I share my referral link?</span>
                    <span class="gilroy-regular fs-20 lh-24 text-purple-dk-1 mt-2"  v-if="currectFaq==8">Within your dashboard, there is a link. Copy that link. You can then send the link or add that link to any online asset that you may own.</span>
                </div>

                <div class="bg-blue-lt-8 p-5 d-flex flex-column mb-2 cursor-pointer" @click="toggleCurrent(9)">
                    <span class="gilroy-medium fs-32 lh-35">How do I receive my commission?</span>
                    <span class="gilroy-regular fs-20 lh-24 text-purple-dk-1 mt-2"  v-if="currectFaq==9">All affiliates and partners are paid once a month via an approved method of receiving payments. You can set your preferred method of commission delivery directly in your affiliate portal here: https://affiliate.spark.com/login</span>
                </div>
        </div>


    </div>
</template>


<script lang="ts" setup>
    import { ref, type Ref } from 'vue'

    const currectFaq: Ref<null|number> = ref(null);
    const toggleCurrent = (curr:number) => {
        currectFaq.value = currectFaq.value == curr ? null : curr
    }
    const howItWorks = [
        {
            icon: "money", 
            title: "Salary for life", 
            description: "Get paid monthly for referring your friends to Spark"
        },
        {
            icon: "request_quote", 
            title: "Easy Payouts", 
            description: "Receive automated monthly payments of your referral earnings into your bank account"
        },
        {
            icon: "all_inclusive", 
            title: "Unlimited earning", 
            description: "There is no earning limit. The more people you recommend to Spark, the more money you'll earn"
        },
    ]
</script>


<style lang="scss" scoped>
    .earn-num{
        opacity: 0.15;
    }
</style>