<template>
    <div class="d-flex flex-column py-4">
        <div class="d-flex flex-column">
            <div class="mx-5 d-flex border-bottom pb-3 mb-3">
                <span class="gilroy-medium fs-20 lh-23 mx-auto">Notifications</span>
                <span class="material-icons cursor-pointer" @click="emit('modal:closed',true)">clear</span>
            </div>
            <div class="mx-4 px-3 d-flex justify-content-between mb-3">
                <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4 cursor-pointer text-decoration-underline" @click="filtered = !filtered">
                    {{ filtered ? 'View all' : 'Filter by unread'}}
                </span>
                <span class="gilroy-medium fs-10 lh-12 text-secondary-lt-4 cursor-pointer text-decoration-underline" @click="emit('mark:all:as-read',true)">
                    {{notificationUnread.length ? 'Mark all as read' : ''}}
                </span>
            </div>
            <div class="notification-items d-flex flex-column hpx-235" v-if="notificationList.length">

                <div 
                    class="notification-item d-flex px-3 mb-1" 
                    v-for="(notification, i) in notificationList" :key="i"
                    :class="{'bg-blue-lt-1': !notification.read,'border-bottom border-blue-lt-1': notification.read}"
                >
                    <div class="px-1 my-auto text-nowrap">
                        <span class="perfect-center wpx-12 hpx-12" :class="{'rounded-circle bg-yellow': !notification.read}">&nbsp;</span>
                    </div>
                    <div class="my-auto fs-10 lh-12 text-blue-dk-1 d-flex flex-wrap flex-grow-1 ps-3" v-html="notification.description"></div>
                    <span class="px-3 text-nowrap my-auto gilroy-regular fs-10 lh-12">{{notification.time}}</span>
                </div>

            </div>
            <div class="notification-items d-flex flex-column hpx-235" v-else>

                <img src="@/assets/img/notifications.svg" class="wpx-180 hpx-145 mspx-70"/>
                <span class="gilroy-medium fs-20 lh-23 mx-auto mt-3">No unread notifications</span>
                <span class="gilroy-regular fs-12 lh-14 mx-auto">Click <strong class="cursor-pointer" @click="filtered=false">View all</strong> to view all of your notifications</span>

            </div>

            <div class="mt-4 px-4 border-bottom border-blue-lt-1">
                <div class="gilroy-medium fs-12 lh-14 text-blue-dk-1 cursor-pointer pb-2" @click="openFrequencies=true">Change email notification frequency</div>
            </div>
            <div v-if="openFrequencies">
                <div class="d-flex border-bottom bg-blue-lt-1 hpx-45 pe-3">
                    <span class="gilroy-medium fs-15 lh-18 mx-auto my-auto">Send me emails notifications...</span>
                    <span class="material-icons cursor-pointer my-auto fs-20" @click="openFrequencies=false">clear</span>
                </div>
                <div class="d-flex justify-content-between cursor-pointer border-bottom border-blue-lt-1 hpx-45 px-4" v-for="(frequency, i) in frequencies" :key="i">
                    <div class="d-flex flex-column justify-content-center my-auto">
                        <span class="gilroy-bold fs-12 lh-14">{{frequency.title}}</span>
                        <span class="gilroy-regular fs-10 lh-12">{{frequency.description}}</span>
                    </div>
                    <span class="material-icons my-auto fs-15 fw-700" v-if="temp_user_frequency== frequency.tag">check</span>
                </div>
            </div>
            <div class="px-4 mt-2" v-if="!openFrequencies">
                <div class="gilroy-medium fs-12 lh-14 text-blue-dk-1 cursor-pointer pb-2">Allow desktop notification</div>
            </div>

        </div>
    </div>
</template>


<script lang="ts" setup>
    import { ref, computed } from 'vue'

    interface NotificationsProps {
        notifications: Record<string, any>
    }
    // eslint-disable-next-line
    const emit = defineEmits(['modal:closed','mark:all:as-read'])
    // eslint-disable-next-line
    const props = defineProps<NotificationsProps>()

    const filtered = ref(true)
    const openFrequencies = ref(false)
    const frequencies = [
        {tag: 'never', title: 'Never', description: 'Don\'t send me emails'},
        {tag: 'periodically', title: 'Periodically', description: 'Send me emails about once  an hour'},
        {tag: 'instantly', title: 'Instantly', description: 'Send me emails as soon as possible'},
    ]
const temp_user_frequency = 'periodically'

const formattedNotificationList = computed(() => {
    const list = props.notifications.map((item:any)=>{
        if(item.type == 'status'){
            item.description = `<span class="gilroy-regular fs-10 lh-12"><b>${item.project}</b> has been moved to <b>${item.status}</b></span>`
        }
        if(item.type == 'comment'){
            item.description = `<span class="gilroy-regular fs-10 lh-12"><b>${item.user}</b> has made a comment on <b>${item.project}</b></span>`
        }
        if(item.type == 'attachment'){
            item.description = `<span class="gilroy-regular fs-10 lh-12"><b>${item.user}</b> added attachment named <b>${item.filename}</b> on <b>${item.project}</b></span>`
        }
        return item
    })
    return list
})

const notificationUnread = computed(()=>formattedNotificationList.value.filter((item:any)=>!item.read))

const notificationList = computed(()=>{
    if(!filtered.value){
        return formattedNotificationList.value
    }else{
        return notificationUnread.value
    }
})


</script>

<style lang="scss" scoped>
    .notification-items{
        overflow-y: scroll;
        .notification-item{
            min-height: 35px;
        }
    }
</style>