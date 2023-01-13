<template>
  <div v-bind="$attrs" :class="[customClass]" class="w-100">
      <slot></slot>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name:"MainContainer",
  props: {
    customClass:{
      type:[Object, String],
      default:"",
    }
  },
  setup(props) {
    return {}
  }
})
</script>