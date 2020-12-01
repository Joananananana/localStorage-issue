<template>
  <div class="shelf-item-three">
    <span class="icon-add"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../../assets/global";
.shelf-item-three{
  width:100%;
  height: 100%;
  border: px2rem(1) solid #ccc;
  box-sizing: border-box;
  position: relative;
  .icon-add{
    font-size: px2rem(30);
    color: #ccc;
    position: absolute;
    top: px2rem(40);
    left: px2rem(27);
  }
}
</style>