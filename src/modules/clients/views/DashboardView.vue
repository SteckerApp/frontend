<template>
    <div class="d-flex flex-column px-4">
        <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1">Overview</span>

        <div class="d-flex flex-wrap my-4">

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                <div class="d-flex">
                    <div class="d-flex flex-column my-auto me-3">
                        <span class="gilroy-medium fs-20 lh-23 text-blue">{{project_manager?.first_name}} {{project_manager?.last_name}}</span>
                        <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4">Your project manager</span>
                        <div class="d-flex pm-contact-icons mt-4">
                            <span class="d-flex justify-content-center align-items-center wpx-26 hpx-26 bg-blue-lt-1 rounded-circle me-3">
                                <i class="material-icons-outlined fs-15 lh-15">call</i>
                            </span>
                            <span class="d-flex justify-content-center align-items-center wpx-26 hpx-26 bg-blue-lt-1 rounded-circle me-3">
                                <i class="material-icons-outlined fs-15 lh-15">mail</i>
                            </span>
                            <span class="d-flex justify-content-center align-items-center wpx-26 hpx-26 bg-blue-lt-1 rounded-circle me-3">
                                <img src="@/assets/img/affiliates/whatsapp.svg" alt=""/>
                            </span>
                        </div>
                    </div>
                    <UserAvatar 
                        class="my-auto"
                        size="73" 
                        :src="project_manager?.avatar"
                    />
                </div>

            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-40 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column">
                        <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">To do</span>
                        <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">{{statistics?.todo}}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">Ongoing</span>
                        <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">{{statistics?.ongoing}}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <span class="gilroy-medium fs-12 lh-14 text-secondary-lt-4">Completed</span>
                        <span class="gilroy-medium fs-25 lh-29 text-blue mt-4 text-center">{{statistics?.completed}}</span>
                    </div>
                </div>

            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-150 mbpx-20 rounded-px-20 bg-white text-black cardShadow">

                <div class="d-flex flex-column my-auto me-3">
                        <span class="gilroy-medium fs-20 lh-23 text-blue">{{mainWorkspace?.name}}</span>
                        <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4">View all your team members</span>
                        
                        <div class="d-flex justify-content-between mt-4" v-if="mainWorkspace?.staffs">
                            <MemberCount class="my-auto" :users="mainWorkspace?.staffs"/>
                            <FormButton label="View all" class="hpx-30 my-auto"/>
                        </div>

                    </div>

            </div>

        </div>

        <div class="d-flex justify-content-between mt-5 pe-4 flex-wrap">
            <span class="gilroy-medium fs-25 lh-28 text-blue-dk-1 mb-2 my-auto">Recent projects</span>
            <FormButton label="Create new project" class="hpx-39 mb-2 my-auto" @click="router.push({name:'Clients.Create.Project'})"/>
        </div>

        <div class="d-flex flex-wrap my-3">

            <!-- <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-178 mbpx-20 rounded-px-20 bg-white text-black" v-for="n in 5" :key="n">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column mb-auto">
                        <span class="gilroy-medium fs-15 lh-18 text-blue-dk-1">Ebook design</span>
                        <span class="gilroy-regular fs-10 lh-12 text-blue-dk-1">Created  20th july, 2020 at 1:33pm</span>
                    </div>
                    <span class="col-1 mb-auto bg-blue-lt-1 text-blue wpx-60 hpx-16 fs-8 lh-9 rounded-px-3 text-center pt-1">To do</span>
                </div>
                <div class="d-flex bg-blue-lt-1 text-blue-dk-1 w-fit-content hpx-17 fs-11 lh-13 rounded-px-3 text-center px-1 align-items-center mt-4">
                    <i class="material-icons me-1 fs-11 lh-13">attach_file</i>
                    <span>11</span>
                </div>
                <div class="d-flex mt-4">
                    <div class="my-auto me-3">26%</div>
                    <div class="my-auto flex-grow-1">
                        <LineProgress :percentage='26' :showPercentage="false"/>
                    </div>
                    <div class="my-auto ms-3">
                        <MemberCount class="my-auto" :users="users"/>
                    </div>
                </div>
            </div> -->

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-178 mbpx-20 rounded-px-20 bg-white text-black" v-for="(project,i) in recent_projects" :key="i">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column mb-auto">
                        <span class="gilroy-medium fs-15 lh-18 text-blue-dk-1">{{project?.title}}</span>
                        <span class="gilroy-regular fs-10 lh-12 text-blue-dk-1" v-if="project?.created_at">
                            Created  {{dateFormatter(project?.created_at,'do MMMM, yyyy')}} at {{dateFormatter(project?.created_at,'h:maaa')}}
                        </span>
                    </div>
                    <span class="col-1 mb-auto bg-blue-lt-1 text-blue wpx-60 hpx-16 fs-8 lh-9 rounded-px-3 text-center pt-1">{{getStatus(project?.status, 'title')}}</span>
                </div>
                <div class="d-flex bg-blue-lt-1 text-blue-dk-1 w-fit-content hpx-17 fs-11 lh-13 rounded-px-3 text-center px-1 align-items-center mt-4">
                    <i class="material-icons me-1 fs-11 lh-13">attach_file</i>
                    <span>{{project?.file_uploads}}</span>
                </div>
                <div class="d-flex mt-4">
                    <div class="my-auto me-3">{{getStatus(project?.status, 'percentage')}}%</div>
                    <div class="my-auto flex-grow-1">
                        <LineProgress :percentage="getStatus(project?.status, 'percentage')" :showPercentage="false"/>
                    </div>
                    <div class="my-auto ms-3">
                        <MemberCount class="my-auto" :users="project?.project_user"/>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 mepx-22 wpx-335 ppx-30 hpx-178 mbpx-20 rounded-px-20 bg-blue-lt-1 text-blue d-flex justify-content-center align-items-center cursor-pointer">
                <span class="fs-18 lh-21 gilroy-regular">View all requests</span>
            </div>


        </div>

    </div>
</template>



<script lang="ts" setup>
    import {ref,nextTick, inject, onMounted, computed} from 'vue'
    import {PROJECT_STATUSES} from '@/globals/const'
    import {dateFormatter} from "@/services/helper-service"
    import {useRouter} from 'vue-router'

    const router = useRouter()

    console.log(PROJECT_STATUSES)

    interface DashboardProps {
        dashboardData:Record<string,any>
    }
    //eslint-disable-next-line
    const props = defineProps<DashboardProps>()
    
    const mainWorkspace = computed(()=>{
        return props.dashboardData?.personal?.workspace
    })
    const statistics = computed(()=>{
        return props.dashboardData?.statistics
    })
    const recent_projects = computed(()=>{
        return props.dashboardData?.projects
    })
    const project_manager = computed(()=>{
        return recent_projects.value?.[0]?.pm
    })

    const getStatus = (status:string,prop:string) =>{
        if((PROJECT_STATUSES as any)[status]){
            return (PROJECT_STATUSES as any)[status][prop]
        }
    }
    
</script>


<style lang="scss" scoped>
    .cardShadow{
        box-shadow: 0px 5px 26px var(--spa-color-blue-lt-1);
    }
</style>