<template>
    <MainContainer class="">
        <img src="../assets/img/auth/auth-top-right.svg" class="topImage" v-if="!route?.meta?.hideTopImage"/>
        <div class="d-flex">
            <div class="sidebar wpx-260 border-end border-blue-lt-1 ppx-30" v-if="!route?.meta?.hideSidebar">
                <SideBar/>
            </div>
            <div class="content d-flex flex-column ppx-30 w-100">
                <div class="topbar"  v-if="!route?.meta?.hideTopbar">
                <div class="d-flex flex-wrap justify-content-between header" v-if="route.meta.menuItemsToShow=='client'">
                   <div class="col-md-6 col-sm-12 col-xs-12 my-auto mb-5">
                        <div class="input-group">
                            <input type="text" class="search form-control rounded-px-5 bg-white border-0" placeholder="Search recent works" aria-describedby="searchGroupAddon"/>
                            <div class="input-group-text searchBtn border border-blue cursor-pointer" id="searchGroupAddon">
                                <i class="material-icons">search</i>
                            </div>
                        </div>
                   </div>
                    <div class="d-flex col-md-6 col-sm-12 col-xs-12 my-auto justify-content-end mb-5">
                        <div class="d-flex my-auto position-relative cursor-pointer" @click="openNotificationModal=true;play()">
                                <i class="material-icons my-auto">notifications_none</i>
                                <span class="dot wpx-6 hpx-6 rounded-circle position-absolute" v-if="newNotification"></span>

                                <span class="gilroy-regular fs-15 lh-18 text-blue-dk-2 my-auto" v-if="newNotification">{{newNotification}}</span>
                        </div>
                        <div class="d-flex ms-5 my-auto">
                            <UserAvatar 
                                class="my-auto"
                                size="60" 
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                            />
                            <div class="d-flex my-auto ms-3 cursor-pointer" @click="sidebarModal=true">
                                <div class="d-flex my-auto fs-20 lh-26 text-black">
                                    <span class="gilroy-regular my-auto">Hello</span>
                                    <span class="gilroy-medium my-auto ms-1">Alexandra</span>
                                </div>
                                <span class="material-icons text-black ms-3 my-auto">arrow_drop_down</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex header mb-5"  v-if="route.meta.menuItemsToShow=='affiliate'">
                    <div class="d-flex my-auto justify-content-end w-100">
                        <div class="d-flex my-auto fs-20 lh-26 text-black">
                            <span class="gilroy-regular my-auto">Hello</span>
                            <span class="gilroy-medium my-auto ms-1">Alexandra</span>
                        </div>
                        <div class="d-flex ms-3 my-auto">
                            <UserAvatar 
                                class="my-auto"
                                size="60" 
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                            />
                        </div>
                    </div>
                </div>
            </div>

                <router-view class="w-100 routerView" v-slot="{ Component }">
                    <component :is="Component" :dashboardData="dashboardData" />
                </router-view>
            </div>
        </div>
        <img src="../assets/img/auth/auth-bottom-left.svg" class="bottomImage" v-if="!route?.meta?.hideBottomImage"/>

        <OffCanvas title="" @modal:closed="sidebarModal=false" v-model="sidebarModal" modalId="rightModal" canvasClass="wpx-350">
            <SidebarWorkSpace :workspaces="workspaces" :mainWorkspace="mainWorkspace" v-if="sidebarShow=='workspace'" @show:profile="sidebarShow='profile'"/>
            <SidebarUserProfile :profile="userProfile"  v-if="sidebarShow=='profile'" @show:workspace="sidebarShow='workspace'"/>
        </OffCanvas>
        <ModalBox 
            class="h-100" 
            v-model="openNotificationModal" 
            :staticBackDrop="false"
            modalContentClass="rounded-0"
            modal-custom-class="notification-class" modalSize="modal-lg" modalWidth="390px"
            @modal:closed="openNotificationModal = false" :modalId="`modal-oti-${Date.now()}`"
        >
        <template #default>
            <NotificationDetails 
                :notifications="notifications" 
                @modal:closed="openNotificationModal = false"
                @mark:all:as-read="markAllAsRead()"
            />
        </template>
      </ModalBox>

    </MainContainer>
</template>



<script lang="ts" setup>
    import {type Ref, ref, reactive, onMounted,provide, computed} from 'vue'
    import MainContainer from './MainContainer.vue';
    import {useRoute} from 'vue-router'
    import SideBar from './SideBar.vue';
    import {getDashboardData, getUserProfile} from './service'
    import AuthService from '@/services/auth-service'
    import SidebarWorkSpace from './components/SidebarWorkSpace.vue';
    import SidebarUserProfile from './components/SidebarUserProfile.vue';
    import NotificationDetails from './components/NotificationDetails.vue';

    
    console.log('layout')

    const play = () => {
        playStackNotificationSound()
    }
    const openNotificationModal = ref(false)
    //const newNotification = ref(12)
    const newNotification = computed(()=>notifications.filter(item=>!item.read)?.length)

    let notifications = reactive([
        {project:'Project 1', status: 'ongoing', time:'5 minutes', read:false, type:"status"},
        {project:'Project 2', status: 'ongoing', time:'5 minutes', read:false, type:"status"},
        {project:'Project 3', status: 'ongoing', time:'5 minutes', read:false, type:"status"},
        {project:'Project 4', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 5', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 6', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 7', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 8', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {project:'Project 9', status: 'ongoing', time:'5 minutes', read:true, type:"status"},
        {user:"User 9" ,project:'Project 9', time:'5 minutes', read:true, type:"comment"},
        {user:"User 9" ,project:'Project 9', filename:'file1.jpg', time:'5 minutes', read:true, type:"attachment"},
    ])
    

    const markAllAsRead = () => {
        const items = notifications.map(item=>{
            item.read = true
            return item
        })
        notifications = items
    }


    const route = useRoute()
    const sidebarModal = ref(false)
    const sidebarShow = ref('workspace')
    const dashboardData = ref({} as any)
    const userProfile = ref({} as any)
    const mainWorkspace = ref({} as any)
    const workspaces = ref([] as any)
    
    const {
        isLoading: dashboardDataIsLoading,
        execute: executeGetDashboardData,
    } = getDashboardData();

    const {
        isLoading: userProfileIsLoading,
        execute: executeGetUserProfile,
    } = getUserProfile();

    
    userProfile.value = AuthService.getLoggedInUser()
    executeGetDashboardData().then((res:any)=>{
        console.log(res.data)
        dashboardData.value = res.data
        userProfile.value.company_role = res.data?.personal?.company_role
        mainWorkspace.value = res.data?.personal?.workspace
        mainWorkspace.value.owner = res.data?.owner[0]
        workspaces.value = res.data?.personal?.other_workspace
    })
    
</script>


<!-- <style lang="scss">
    body{
        background: linear-gradient(0deg, #F7F7FB, #F7F7FB), #F4F4F4!important;
    }
</style>
 -->
<style lang="scss" scoped>
    body{
        background: linear-gradient(0deg, #F7F7FB, #F7F7FB), #F4F4F4!important;
    }

    ::v-deep(.notification-class){
        &.modal{
            position:fixed;
            top: -10vh;
            left: 500px;
            /* top: -200px;
            left: 515px; */
        }
        .modal-body{
            padding:0!important;
        }
    }
.sidebar{
    min-height: 100vh;
}
.content{
    .search{
        &:focus, &:hover{
            border: 1px solid var(--spa-color-blue)!important;
            box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11)!important;
        }
    }
    .searchBtn{
        background: var(--spa-color-blue-lt-1)!important;
        border: 1px solid var(--spa-color-blue)!important;
        border-radius: 5px!important;
        margin-left: auto!important;
    }
    .dot{
        background: linear-gradient(180deg, rgba(255, 0, 0, 0.8) 0%, rgba(215, 4, 4, 0.8) 52.08%, rgba(255, 0, 0, 0.8) 100%);
        top: 6px;
        left: 13px;
    }
}
.routerView{
    min-height: 80vh;
}

.topImage{
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: -1000;
}
.bottomImage{
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: -1000;
}

</style>