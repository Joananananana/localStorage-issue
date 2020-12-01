<template>
<transition name="fade">
  <div class="shelf-title" v-show="shelfTitleVisible" :class="{'hide-shadow':ifHideShadow}">
      <div class="shelf-title-text-wrapper">
          <div class="shelf-title-text">
              <div class="shelf-title-text-item">书架</div>
              </div>
          <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left">
          <span class="shelf-title-btn-text icon-clear" @click="clearCache"></span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right">
          <span class="shelf-title-btn-text" @click="onEditClick">{{ isEditMode ? "取消" : "编辑"}}</span>
      </div>
  </div>
</transition>
</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
export default {
    mixins:[storeShelfMixin],
    computed:{
        selectedText(){
            const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
            return selectedNumber <= 0 ? "选择书籍" : "已选择$本书".replace('$',selectedNumber)
        }
    },
    methods:{
        onEditClick(){
            if(!this.isEditMode){
                this.setShelfSelected([])
                this.shelfList.forEach(item => item.selected = false);
            }
            this.setIsEditMode(!this.isEditMode)
        },
        clearCache(){
            
        }
    },
    watch:{
        offsetY(offsetY){
            if(offsetY > 0){
                this.ifHideShadow = false
            }else{
                this.ifHideShadow = true
            }
        }
    },
    data(){
        return{
            ifHideShadow:true
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/global";
.shelf-title{
    position: relative;
    width: 100%;
    z-index: 130;
    height: px2rem(42);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0,0,0,.1);
    &.hide-shadow{
        box-shadow: none;
    }
    .shelf-title-text-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: px2rem(42);
        @include columnCenter;
        .shelf-title-text{
            .shelf-title-text-item{
            margin-top:px2rem(8);
            box-sizing: border-box;
            font-size: px2rem(16);
            font-weight: bold;
            color: #333;
            }
        }
        .shelf-title-sub-text{
            margin-top:px2rem(10);
            box-sizing: border-box;
            font-size: px2rem(10);
            color: rgb(170, 169, 169);
        }
    }
    .shelf-title-btn-wrapper{
        position: absolute;
        top: 0;
        box-sizing: border-box;
        height: 100%;
        @include center;
        .shelf-title-btn-text{
            font-size: px2rem(14);
            color:#666;
            &.icon-clear{
                font-size:px2rem(25);
            }
        }
        &.shelf-title-left{
            left: 0;
            padding-left: px2rem(15);
            padding-top: px2rem(5);
        }
        &.shelf-title-right{
            right: 0;
            padding-top: px2rem(5);
            padding-right: px2rem(15);
        }
    }
}
</style>