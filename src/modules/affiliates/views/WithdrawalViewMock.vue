<template>
    <div class="d-flex flex-column px-4">
        
        <div class="bg-blue-lt-6 rounded-px-20 pxpx-60 pypx-70">
            <div class="d-flex flex-column">
                <span class="gilroy-medium fs-23 lh-25">Bank Account</span>
                <span class="gilroy-regular fs-13 lh-15 mt-1">Your referral earnings will be creadited into this account</span>
            </div>
            <div class="container mt-4 px-0">
                <div class="d-flex flex-wrap mb-3">
                    <label for="accountName" class="my-auto col-sm-3 col-form-label gilroy-regular fs-20 lh-23">Account name</label>
                    <div class="my-auto col-sm-9">
                        <AuthTextInput 
                            element-class="auth-element hpx-53 bg-secondary-lt-5 rounded-0 border-blue-lt-1" 
                            placeholder="John Doe" 
                            id="accountName"
                        />
                    </div>
                </div>
                <div class="d-flex flex-wrap mb-3">
                    <label for="accountNumber" class="my-auto col-sm-3 col-form-label gilroy-regular fs-20 lh-23">Account number</label>
                    <div class="my-auto col-sm-9">
                        <AuthTextInput 
                            element-class="auth-element hpx-53 bg-secondary-lt-5 rounded-0 border-blue-lt-1" 
                            placeholder="2020075293"
                            id="accountNumber"
                        />
                    </div>
                </div>
                <div class="d-flex flex-wrap mb-3">
                    <label for="bankName" class="my-auto col-sm-3 col-form-label gilroy-regular fs-20 lh-23">Bank name</label>
                    <div class="my-auto col-sm-9">
                        <AuthTextInput 
                            element-class="auth-element hpx-53 bg-secondary-lt-5 rounded-0 border-blue-lt-1" 
                            placeholder="Zenith Bank"
                            id="bankName"
                        />
                    </div>
                </div>
                <div class="d-flex flex-wrap mb-3">
                    <label for="bankName" class="my-auto col-sm-3 col-form-label gilroy-regular fs-20 lh-23"></label>
                    <div class="my-auto col-sm-9">
                        <FormButton label="Save" class="w-100 hpx-50 perfect-center rounded-px-10"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex flex-column bg-white pxpx-60 pypx-40 rounded-px-16 mt-4">
        <div class="d-flex justify-content-between mb-3">
            <span class="gilroy-medium fs-25 lh-29 text-blue-dk-1">Referral History</span>
            <span class="material-icons-outlined fs-30 lh-29 text-blue-dk-1">filter_alt</span>
        </div>  
        <div class="table-responsive mt-3">
            <table class="table table-borderless">
                <thead>

                    <tr>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-30">User</th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-40 text-center">Earned</th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 w-30 text-end">Referred date</th>
                    </tr>

                </thead>

                <tbody>
                    <tr v-for="n in 5" :key="n">
                        <th scope="row">
                            <div class="d-flex">
                                <UserAvatar 
                                    class="my-auto"
                                    size="37" 
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                                />
                                <span class="my-auto gilroy-regular fs-15 lh-18 ms-3">James</span>
                            </div>
                        </th>
                        <td class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-center">N5000</td>
                        <th scope="row" class="gilroy-regular fs-16 lh-19 text-blue-dk-1 text-end">Oct. 21, 2021</th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col" class="gilroy-medium fs-14 lh-16 text-decoration-underline ps-4 cursor-pointer w-40 text-end">Load more</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    <div class="gilroy-regular fs-12 text-center my-5">Please note that all Payouts are done every last friday of the month.</div>

    </div>
</template>





<script lang="ts" setup>
    import {ref, onMounted} from 'vue'
    import AuthService from '@/services/auth-service'
    import {getAffiliateData} from '../services'

    let affiliateData = ref({} as any)

    const {
        isLoading: affiliateDataIsLoading,
        execute: executeGetAffiliateData,
    } = getAffiliateData();

    onMounted(()=>{
        executeGetAffiliateData().then((res:any)=>{
            affiliateData.value = res.data
        })
    })
    const copyReferrerCode = ()=>{
        navigator.clipboard.writeText(affiliateData.value?.referral_code);
    }
</script>

<style lang="scss" scoped>
    .referrer{
        min-height: 345px;
        &-head{
            background-image: url(@/assets/img/affiliates/bg-1.svg);
            background-repeat: no-repeat;
            background-size:cover;
            min-height:150px;
            .header-title{
                font-size:3.25vw
            }
            .header-text{
                font-size:1.2vw
            }
        }
    }
</style>