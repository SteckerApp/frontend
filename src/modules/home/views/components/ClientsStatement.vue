<template>
    <div class="d-flex flex-column py-4 my-5 position-relative">
    <span class="fs-60 lh-70 gilroy-medium mx-auto mb-5">What Our Clients Say About Us</span>
    <div class="px-5 position-relative">
        <Carousel :wrap-around="true" :breakpoints="breakpoints" :autoplay="5000">
            
            <Slide v-for="slide in slides" :key="slide.id">
                    <div class="carousel__item">
                        
                        <div class="me-3 bg-blue-lt-9 rounded-px-20 p-5">

                            <div class="d-flex flex-column">
                                <div class="d-flex justify-content-between mb-4">
                                    <div class="d-flex mb-auto">
                                        <UserAvatar 
                                            class="my-auto"
                                            size="47" 
                                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                        />
                                        <div class="d-flex flex-column ms-3">
                                            <span class="gilroy-medium fs-20 lh-23 mb-2">{{slide.name}}</span>
                                            <span class="gilroy-regular fs-13 lh-15">{{slide.position}}</span>
                                        </div>
                                    </div>
                                    <i class="material-icons-outlined mb-auto">format_quote</i>
                                </div>
                                <div class="gilroy-medium fs-20 lh-23 text-start mt-3 hpx-100 overflow-scroll">
                                    {{slide.comment}}
                                </div>
                            </div>

                        </div>

                    </div>
                </Slide>
            <template #addons>
                <!-- <Navigation /> -->
                <Pagination />
            </template>
        </Carousel>
        <img src="@/assets/img/home/our-clients.svg" alt="" class="our-client position-absolute"/>
    </div>
    </div>

</template>


<script lang="ts" setup>
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

    interface SlideProp {
        id:number;
        name:string;
        position:string;
        comment:string;
    }
    //eslint-disable-next-line
    const props = defineProps<{slides: SlideProp[]}>()

    const breakpoints = {
        // 700px and up
        700: {
            itemsToShow: 2,
            snapAlign: 'center',
        },
        // 1024 and up
        1024: {
            itemsToShow: 2,
            snapAlign: 'start',
        },
    }
</script>


<style lang="scss" scoped>
    .our-client{
        z-index: -1;
        top: -100px;
    }
    ::v-deep(.carousel__pagination-button){
        &:after{
            margin-top: 3rem;
            width: 12px;
            height: 12px;
            border: 2px solid #1227E2;
            border-radius: 50%;
            background:transparent;
        }
        &.carousel__pagination-button--active{
            &:after{
                background:#1227E2;
            }
        }
    }
</style>