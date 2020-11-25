<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
      <div class="flap-card-bg" v-show="runFlapCardAnimation">
          <animation class="animation" ></animation>
      </div>
      <div class="close-btn-wrapper" @click="close" v-show="!runFlapCardAnimation && runBookCardAnimation" :class="{'animation':runBookCardAnimation}">
          <span class="icon-close">×</span>
      </div>
      <div class="book-card" :class="{'animation':runBookCardAnimation}" v-show="runBookCardAnimation">
          <div class="book-card-wrapper">
              <div class="img-wrapper">
                  <img :src="data ? data.cover : ''" class="img">
              </div>
              <div class="content-wrapper">
                  <div class="content-title">{{data ? data.title : ''}}</div>
                  <div class="content-author sub-title-medium">{{data ? data.author : ''}}</div>
                  <div class="content-category">{{categoryText()}}</div>
              </div>
              <div class="read-btn" @click.stop="showBookDetail(data)">点击阅读</div>
          </div>
          
      </div>
     
  </div>
</template>

<script>
import { storeHomeMixin } from '../../utils/mixin'
import Animation from './animation.vue'
import {categoryText} from '../../utils/store'
export default {
  components: { Animation },
    mixins:[storeHomeMixin],
    methods:{
        close(){
            this.setFlapCardVisible(false)
            this.runBookCardAnimation = false
            this.runFlapCardAnimation = true
        },
        categoryText(){
            if(this.data){
               return  categoryText(this.data.category,this)
            }else{ return '' }
        },
        runAnimation(){
            setTimeout(() => {
                this.runBookCardAnimation = true
                this.runFlapCardAnimation = false
            },1500)
        }
    },
    props:{
        data:Object
    },
    data(){
        return {
            runBookCardAnimation:false,
            runFlapCardAnimation:true
        }
    }
 
}
</script>

<style lang="scss">
 @import "../../assets/global";
 .flap-card-wrapper{
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom:0;
     z-index: 600;
     width: 100%;
     height: 100%;
     background:rgba(0 ,0 ,0 ,.6);
     @include center;
     .flap-card-bg{
         position: relative;
         
     }
     .close-btn-wrapper{
         position: absolute;
         left: 0;
         top: px2rem(20);
         z-index: 601;
         width: 100%;
         @include center;
         &.animation{
             animation: scale .3s linear;
             @keyframes scale {
                 0%{
                    
                     opacity: 0;
                 }
                 100%{
                   
                     opacity: 1;
                 }               
             }
         }
         .icon-close{
             position: absolute;
             top:px2rem(155);
             left: px2rem(285);
             width: px2rem(35);
             height: px2rem(35);
             font-size: px2rem(25);
             border-radius: 50%;
             background: #333;
             opacity: 0.8;
             color: white;
             @include center;
         }
     }
     .book-card{
         position: relative;
         width: 65%;
         max-width: px2rem(400);
         box-sizing: border-box;
         border-radius: px2rem(15);
         background:white;
         &.animation{
             animation: scale .3s ease-in both;
             @keyframes scale {
                 0%{
                     transform: scale(0);
                     opacity: 0;
                 }
                 100%{
                     transform: scale(1);
                     opacity: 1;
                 }               
             }
         }
         .book-card-wrapper{
             width: 100%;
             height: 100%;
             margin-bottom: px2rem(30);
             display: flex;
             flex-direction: column;
             justify-content:flex-start;
             align-items: center;
             .img-wrapper{
                 width: 100%;
                 margin-top: px2rem(20);
                 @include center;
                 .img{
                     width: px2rem(90);
                     height: px2rem(130);
                 }
             }
             .content-wrapper{
                 padding: 0 px2rem(20);
                 margin-top: px2rem(20);
                 .content-title{
                     color: #333;
                     font-weight: bold;
                     font-size: px2rem(20);
                     line-height: px2rem(20);
                     max-height: px2rem(40);
                     text-align: center;
                     @include ellipsis2(2)
                 }
                 .content-author{
                     font-size: px2rem(14);
                     margin-top: px2rem(8);
                    color: #999;
                    padding: 0 px2rem(10) 0 px2rem(10);
                    box-sizing: border-box;
                     text-align: center;
                 }
                 .content-category{
                     color: #999;
                     font-size: px2rem(14);
                     margin-top: px2rem(10);
                     text-align: center;
                 }
             }
             .read-btn{
                 position: absolute;
                 bottom: 0;
                 left: 0;
                 z-index: 800;
                 width: 100%;
                 border-radius: 0 0 px2rem(15) px2rem(15);
                 padding: px2rem(15) 0;
                 text-align: center;
                 color: white;
                 font-size: px2rem(14);
                 background:#4169E1;
             }
         }
     }
     
 }
</style>