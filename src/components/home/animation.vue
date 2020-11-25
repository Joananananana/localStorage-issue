<template>
<div>
    <lottie :options="defaultOptions" :width="200"  v-on:animCreated="handleAnimation"/>
</div>
  
</template>

<script>
import lottie from 'vue-lottie' 
import * as animationData from '@/assets/772-bookmark-animation.json'
export default {
    components:{lottie},
    data () {
    return {
      defaultOptions: { animationData: animationData.default },
      anim:''
    }
  },
  methods: {
    handleAnimation (anim) {
      this.anim = anim
    },
    
  },
  mounted(){
      animationData.assets.forEach((item) => {
  item.u = ''
  if (item.w && item.h) {
    item.p = require(`@/assets/772-bookmark-animation.json`)
  }
}); 
  }
}
</script>

<style>

</style>