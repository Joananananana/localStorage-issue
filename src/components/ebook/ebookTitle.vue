<template>
  <transition name="slide-down" appear>
      <div class="title-wrapper" v-if="menuVisible">
          <div class="left">
              <span class="icon-qianjin icon" @click="back"></span>
          </div>
          <div class="right">
              <div class="icon-wrapper">
                  <span class="icon-2 icon"></span>
              </div>
              <div class="icon-wrapper">
                  <span class="icon-cart icon"></span>
              </div>
              <div class="icon-wrapper">
                  <span class="icon-more icon"></span>
              </div>
          </div>
      </div>
    </transition>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
export default {
    mixins:[ebookMixin],
    methods:{
        back(){
            console.log("back")
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
.title-wrapper{
        position: absolute;
        display: flex;
        top:0;left:0;
        width: 100%;
        height: px2rem(48);
        z-index:201;
        background: white;
        box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
        font-size:px2rem(20);
        .left{
            flex:0 0 px2rem(60);
            @include center;
        }
        .right{
            flex:1;
            display: flex;
            justify-content: flex-end;
            .icon-wrapper{
                flex:0 0 px2rem(40);
                @include center;
                .icon-1{
                    font-size:px2rem(19);
                }
            }
        }
    }
</style>