<template>
    <div class="position-relative">
        <img src="@/assets/img/auth/auth-top-right.svg" class="topImage position-fixed top-0 end-0" />
        <img src="@/assets/img/auth/auth-bottom-left.svg" class="bottomImage position-fixed bottom-0 start-0" />
        <div class="d-flex flex-wrap pypx-150 pxpx-200">
            <div class="card-left wpx-480 me-5 mb-5">
                <div class="fs-45 lh-53 gilroy-medium text-blue mb-2">
                    Using Spark is like having your own in-house design team but better.
                </div>
                <div class="fs-20 lh-23 gilroy-regular text-blue-dk-1">
                    Spark gives you all the good stuff that come with having your own in-house designer and with the added benefits that come from working with a professional design agency. Say GOODBYE to hiring cost and HR dramas. Fixed monthly rate for all your design needs and you can cancel anytime.
                </div>
            </div>
            <div class="card-right bg-secondary-lt-5 rounded-px-20 wpx-464 pypx-60 px-5">
                <div class="mb-3">
                    <AuthTextInput 
                        element-class="auth-element bg-transparent hpx-50 rounded-0" 
                        placeholder="Name" 
                    />
                </div>
                <div class="mb-3">
                    <AuthTextInput 
                        element-class="auth-element bg-transparent hpx-50 rounded-0" 
                        placeholder="Email Address" 
                    />
                </div>
                <div class="mb-3">
                    <AuthTextInput 
                        element-class="auth-element bg-transparent hpx-50 rounded-0" 
                        placeholder="Phone number" 
                    />
                </div>
                <div class="mb-3">
                    <AuthTextInput 
                        element-class="auth-element bg-transparent hpx-50 rounded-0" 
                        placeholder="How did you hear about us" 
                    />
                </div>
                <FormButton label="Watch now" class="hpx-40 rounded-0 w-100" />
                <div class="fs-12 lh-14 gilroy-regular text-secondary-lt-4 mt-3 text-center">You'll be automatically be redirected</div>
            </div>
        </div>
    </div>
</template>




<style lang="scss" scoped>

.topImage, .bottomImage{
    z-index: -1;
} 

</style>