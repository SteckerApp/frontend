<template>
    <footer>
        <div class="d-flex hpx-370 text-white bg-blue-dk-1 pxpx-150 position-relative">
            <div class="curvedbg position-absolute bottom-0 start-0 hpx-220 w-70"></div>
            <div class="col-6 col-md-6 col-sm-6 col-xs-12 ptpx-70">
                <div class="d-flex flex-column">

                    <div class="d-flex mb-3">
                        <span class="my-auto wpx-31 hpx-31 perfect-center rounded-px-8 bg-white me-2">
                            <img src="@/assets/img/home/spark.svg" alt=""/>
                        </span>
                        <span class="my-auto text-white gilroy-bold fs-25 lh-29">
                            spark
                        </span>
                    </div>

                    <div class="getApp position-relative">
                        <div class="gilroy-regular fs-16 lh-19 mt-2 mbpx-10">Get Spark for mobile and desktop</div>
                        <div class="d-flex flex-wrap wpx-350">
                            <img src="@/assets/img/home/google-play.svg" alt="" class="wpx-121 hpx-36 me-2 mb-1"/>
                            <img src="@/assets/img/home/apple-store.svg" alt="" class="wpx-121 hpx-36 me-2 mb-1"/>
                            <img src="@/assets/img/home/windows.svg" alt="" class="wpx-121 hpx-36 me-2 mb-1"/>
                            <img src="@/assets/img/home/mac.svg" alt="" class="wpx-121 hpx-36 me-2 mb-1"/>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-6 col-md-6 col-sm-6 col-xs-12 ptpx-70">
                <table class="table table-sm table-borderless text-white">
                   <thead>
                        <tr>
                            <th>Company</th>
                            <th>Services</th>
                            <th>Legal</th>
                        </tr>
                   </thead>
                   <tbody>
                        <tr>
                            <td>About</td>
                            <td><router-link to="/works" class="fs-15 lh-19 gilroy-regular text-white text-decoration-none">Our works</router-link></td>
                            <td><router-link to="/terms-of-service" class="fs-15 lh-19 gilroy-regular text-white text-decoration-none">Terms of service</router-link></td>
                        </tr>
                        <tr>
                            <td>Careers</td>
                            <td><router-link to="/pricing" class="fs-15 lh-19 gilroy-regular text-white text-decoration-none">Pricing</router-link></td>
                            <td><router-link to="/privacy-policy" class="fs-15 lh-19 gilroy-regular text-white text-decoration-none">Privacy policy</router-link></td>
                        </tr>
                        <tr>
                            <td><div class="fs-15 lh-19 gilroy-regular text-white cursor-pointer" @click="callModal=true">Book a call</div></td>
                            <td>Blog</td>
                            <td>dds</td>
                        </tr>
                        <tr>
                            <td>Become an affiliate</td>
                            <td>Faq</td>
                            <td></td>
                        </tr>
                   </tbody>
                </table>
            </div>
        </div>


        <div class="d-flex justify-content-between align-items-center hpx-80 text-white bg-red-dk-1 pxpx-150">
            <span class="copyright fs-18 lh-20 gilroy-regular">©2022 Spark.  All rights reserved</span>
            <div class="links d-flex">
                <span class="fs-18 lh-20 gilroy-regular me-5 my-auto">+234 815 3071 028</span>
                <div class="d-flex my-auto ms-3">
                    <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 rounded-circle d-flex border border-white justify-content-center align-items-center">
                        <img src="@/assets/img/home-icons/facebook.svg" alt=""/>
                    </div>
                    <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 rounded-circle d-flex border border-white justify-content-center align-items-center">
                        <img src="@/assets/img/home-icons/instagram.svg" alt=""/>
                    </div>
                    <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 rounded-circle d-flex border border-white justify-content-center align-items-center">
                        <img src="@/assets/img/home-icons/twitter.svg" alt=""/>
                    </div>
                    <div class="my-auto me-2 cursor-pointer wpx-35 hpx-35 rounded-circle d-flex border border-white justify-content-center align-items-center">
                        <img src="@/assets/img/home-icons/linkedin.svg" alt=""/>
                    </div>
                </div>
            </div>
        </div>

        <BookACall :openCallModal="callModal" @modal:closed="callModal = false"/>

    </footer>
</template>


<script lang="ts" setup>
    import { ref } from 'vue'
    import BookACall from './BookACall'

    const callModal = ref(false);

</script>


<style lang="scss" scoped>
    .getApp{
        z-index: 1;
    }
    .curvedbg{
        background-image: url(@/assets/img/home/footer-curved.svg);
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 1;
    }
    .table {
        th{
            font-family: Gilroy-Bold;
            font-size: 25px;
            line-height:29px
        }
        td{
            position: relative;
            z-index: 1;
            font-family: Gilroy-Regular;
            font-size: 15px;
            line-height:19px
        }
    }
</style>