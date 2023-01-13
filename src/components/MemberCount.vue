<template>
    <div class="d-flex justify-content-between" :class="[componentWidth]">
        <div class="d-flex position-relative">
            <UserAvatar 
                v-for="(user,i) in overlayAvatars"
                :key="i"
                class="my-auto position-absolute"
                :class="`avatar-${i}`"
                :style="positionStyles(i)"
                :size="size" 
                fullName="" 
                :src="user.avatar"
            />
        </div>
        <span
            v-if="!addUser" 
            class="perfect-center bg-blue-lt-1 text-blue-dk-1 gilroy-medium rounded-circle" 
            :class="[{invisible:users.length<=3},`wpx-${size} hpx-${size} fs-${Math.round(size/3)} lh-${Math.round(size/3)}`]"
        >
            {{users.length-3}}
        </span>
        <div class="position-relative" v-if="addUser">
            <span
                class="perfect-center bg-blue-lt-1 gilroy-medium rounded-circle cursor-pointer" 
                :class="[{invisible:users.length<=3, 'text-blue': !openAddUserBox, 'text-danger': openAddUserBox},`wpx-${size} hpx-${size} fs-${Math.round(size/3)} lh-${Math.round(size/3)}`]"
                @click="openAddUserBox=!openAddUserBox"
            >
                {{openAddUserBox ? 'x': '+'}}
            </span>
            <div class="userBox position-absolute wpx-270 hpx-300 p-3 mt-2 bg-white" v-if="openAddUserBox">
                <AuthTextInput 
                    element-class="auth-element hpx-38 rounded-0 border-blue" 
                    placeholder="Search member" 
                    v-model="searchWord"
                />
                <div class="d-flex flex-column hpx-230 overflow-auto py-3">

                    <div class="d-flex mb-3" v-for="(user, i) in teamMembers" :key="i">
                        <UserAvatar :size="22" :src="user.avatar" class="my-auto" />
                        <span class="gilroy-regular fs-14 lh-16 my-auto ms-3">{{user.name}}</span>
                        <input type="checkbox" class="my-auto ms-auto" v-model="user.is_selected" :true-value="true" :false-value="false"/>
                    </div>

                </div>
            </div>
        </div>
        <!-- <div class="userModal position-fixed top-0 start-0 w-100 h-100 overflow-auto" v-if="openAddUserBox">
            <div></div>
        </div> -->
    </div>
</template>


<script lang="ts" setup>
    import {computed, ref} from 'vue'
    interface MemberCountProps {
        users:{id:number, avatar:string}[];
        size:number;
        componentWidth:string;
        addUser?: boolean;
        team?:{id:number, avatar:string, name?:string, is_selected?:boolean}[];
    }
    //eslint-disable-next-line
    const props = withDefaults(defineProps<MemberCountProps>(),{
        size:24,
        componentWidth:'wpx-80',
    })

    const overlayAvatars = computed(()=>{
        return props.users.slice(0,3)
    })
     const positionStyles = (index:number)=>{
        return [
            {zIndex:10},
            {zIndex:9, left:`${props.size/2}px`},
            {zIndex:8, left:`${props.size}px`},
        ][index]
    }
    const openAddUserBox = ref(false)
    const searchWord = ref('')
    const teamMembers = computed(()=>{
        const users = props?.team?.map((user)=>{
            const userInUsers = props.users.findIndex((u)=>u.id==user.id)
            user.is_selected = userInUsers==-1 ? false : true
            return user
        })
        return users?.sort((a, b) => (a?.is_selected === b?.is_selected) ? 0 : a?.is_selected ? -1 : 1)
    })
</script>



<style lang="scss" scoped>
    .userBox{
        box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.1);
        z-index:1;
    }
    .userModal{
        z-index: 1;
        /* background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0,0.4);  */
    }
    /* .avatar{
        &-0{
            z-index: 10;
        }
        &-1{
            left:12px;
            z-index: 9;
        }
        &-2{
            left:24px;
            z-index: 8;
        }
    } */
</style>