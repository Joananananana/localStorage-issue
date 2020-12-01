<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div class="shelf-footer-tab-wrapper" v-for="item in tabs" :key="item.index"
    @click="onTabClick(item)" >
      <div class="shelf-foot-table">
        <div class="icon-private tab-icon" :class="{'is-selected':isSelected}"  v-if="item.index === 1" ></div>
        <div class="icon-download tab-icon" :class="{'is-selected':isSelected}"  v-if="item.index === 2"></div>
        <div class="icon-move tab-icon"  :class="{'is-selected':isSelected}" v-if="item.index === 3"></div>
        <div class="icon-2 tab-icon"  :class="{'is-selected':isSelected}" v-if="item.index === 4"></div>
        <div class="teb-text">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {storeShelfMixin} from '../../utils/mixin'
export default {
    mixins:[storeShelfMixin],
    computed:{
      tabs(){
        return[
          {
            label:'私密',
            label2:'关闭私密',
            index:1
          },
          {
            label:'缓存',
            label2:'删除缓存',
            index:2
          },{
            label:'移动',
            index:3
          },{
            label:'移除',
            index:4
          }
        ]
      },
      isSelected(){
        return this.shelfSelected && this.shelfSelected.length>0
      }
    },
    methods:{
      onTabClick(item){
        this.$createToast({
          $props:{
            text:'hello'
          }
        }).show()
      }
    }
}
</script>

<style lang="scss">
@import "../../assets/global";
.shelf-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: px2rem(48);
    z-index: 120;
    display: flex;
    background: white;
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0,0,0,.1);
    .shelf-footer-tab-wrapper{
      flex:1;
      width:25%;
      height: 100%;
      .shelf-foot-table{
        width:100%;
        height: 100%;
        @include columnCenter;
        .tab-icon{
          font-size: px2rem(20);
          color: #666;
          opacity: 50%;
          &.icon-2{
            font-size: px2rem(18);
          }
           &.icon-move{
            font-size: px2rem(22);
          }
        }
        .teb-text{
          margin-top: px2rem(5);
          font-size: px2rem(12);
          color: #666;
          opacity: 50%;
        }
        .is-selected{
          opacity: 1;
        }
      }
    }
}
</style>