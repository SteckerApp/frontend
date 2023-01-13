<template>

    <div class="offer pypx-70 pxpx-150">
        <div class="fs-60 lh-70 gilroy-medium text-center mb-5">What you get with every plan</div>
        <div class="d-flex flex-wrap">

            <div class="d-flex wpx-360 me-3 mb-5" v-for="(offer, i) in offers" :key="i">
                <span class="wpx-68 hpx-68 perfect-center bg-blue-lt-1 rounded-circle text-blue me-3 flex-shrink-0">
                    <i class="material-icons fs-32">{{offer.icon}}</i>
                </span>
                <div class="d-flex flex-column pt-1">
                    <span class="gilroy-medium fs-30 lh-35 mb-2 text-wrap">{{offer.title}}</span>
                    <span class="gilroy-regular fs-20 lh-23 text-wrap">{{offer.description}}</span>
                </div>
            </div>

        </div>
        
    </div>
</template>


<script lang="ts" setup>
    const offers = [
        {
            icon: "all_inclusive", 
            title: "Unlimited Design", 
            description: "Submit and queue up as many design projects as you want on our platform."
        },
        {
            icon: "credit_card", 
            title: "7 days Money-back", 
            description: "Get a full refund within 7 days if Spark isn't the perfect design service for you."
        },
        {
            icon: "copyright", 
            title: "Ownership of files", 
            description: "Have 100% ownership of all original source files created for your project."
        },
        {
            icon: "groups", 
            title: "Team collaboration", 
            description: "Get more done together. Invite your team colleagues and clients."
        },
        {
            icon: "support_agent", 
            title: "Human support", 
            description: "Our dedicated support team is always on standby, ready to assist."
        },
        {
            icon: "rocket_launch", 
            title: "Quick turnaround", 
            description: "Get your designs delivered on time"
        },
    ]
</script>