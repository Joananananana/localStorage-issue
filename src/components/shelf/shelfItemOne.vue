<template>
    <div class="shelf-item-one">
        <img :src="data.cover" class="shelf-item-book-cover"></div>
</template>

<script>
export default {
    props:{
        data:Object
    }
}
</script>


<style lang="scss">
@import "../../assets/global";
 .shelf-item-one{
     width: 100%;
     height:100%;
     .shelf-item-book-cover{
         width: 100%;
         height:100%;
         border-radius: px2rem(5);
     }
 }
</style>