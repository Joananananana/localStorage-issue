<template>
  <div class="shelf-search-wrapper" :class="{'search-top':ifInputClicked,'hide-shadow':ifHideShadow}">
      <div class="shelf-search" :class="{'search-top':ifInputClicked}">
          <div class="icon-search-wrapper">
              <span class="icon-search icon"></span>
          </div>
          <div class="search-input-wrapper">
              <input type="text" class="search-input" placeholder="请输入书名"  v-model="searchText" @click="onSearchClick">
          </div>
          <div class="icon-clear-wrapper" v-show="searchText.length > 0" @click="clearSearchText">
              <span class="icon-close">×</span>
          </div>
          <div class="icon-cancel-wrapper" v-show="ifInputClicked" @click="onCancelClick" >
              <span class="cancel">取消</span>
          </div>
      </div>
      <transition name="hot-search-move">
      <div class="shelf-search-table-wrapper" v-if="ifInputClicked">
          <div class="shelf-search-table-item" v-for="item in tabs" :key="item.id" @click="onTabClick(item.id)">
              <span class="shelf-search-tab-text" :class="{'is-selected':item.id === selectedTab}">{{item.text}}</span>
          </div>
      </div>
      </transition>
      </div>
</template>

<script>
import {storeShelfMixin} from '../../utils/mixin'
export default {
    mixins:[storeShelfMixin],
    data(){
        return {
            searchText:"",
            ifInputClicked:false,
            selectedTab:1,
            ifHideShadow:true
        }
    },
    computed:{
        tabs(){
            return [
                {
                    id:1,
                    text:'默认'
                },
                {
                    id:2,
                    text:'按进度'
                },
                {
                    id:3,
                    text:'按购买'
                }
            ]
        }
    },
    methods:{
        clearSearchText(){
            this.searchText = ''
        },
        onSearchClick(){
            this.ifInputClicked = true
            this.setShelfTitleVisible(false)
        },
        onCancelClick(){
            this.ifInputClicked = false
            this.setShelfTitleVisible(true)
        },
        onTabClick(id){
            this.selectedTab = id
        }
    },
    watch:{
        offsetY(offsetY){
            if(offsetY > 0 &&   this.ifInputClicked){
                this.ifHideShadow = false
            }else{
                this.ifHideShadow = true
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/global";
.shelf-search-wrapper{
    z-index: 105;
    position: relative;
    width: 100%;
    height: px2rem(80);
    margin:0 px2rem(8) 0 0 ;
    font-size: px2rem(15);
    background: white;
    display:flex;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0,0,0,.1);
    &.hide-shadow{
        box-shadow: none;
    }
    &.search-top{
        position: fixed;
        left: 0;
        top: 0;
    }
    .icon-cancel-wrapper{
        flex: 0 0 px2rem(30);
        @include right;
        padding: px2rem(3) px2rem(8) 0 0;
            .cancel{
                font-size: px2rem(14);
                color: rgb(116, 181, 255);
            }
    }
    .shelf-search{
        position: absolute;
        top: px2rem(40);
        width:px2rem(350);
        height:px2rem(25);
        z-index: 105;
        display: flex;
        margin:px2rem(10) px2rem(5) 0 px2rem(13);
        border:px2rem(1) solid #ccc;
        border-radius: px2rem(3);
        transition: top .2s linear;
        &.search-top{
            top:px2rem(10);
        }
       
        .icon-search-wrapper{
            flex: 0 0 px2rem(22);
            @include right;
            .icon-search{
                position: absolute;
                top: px2rem(7);
                font-size: px2rem(12);
            }
        }
        .search-input-wrapper{
            flex:1;
            padding:0 px2rem(10);
            box-sizing: border-box;
            .search-input{
                width: 100%;
                height: px2rem(23);
                border: none;
                font-size: px2rem(14);
                color: rgb(190, 190, 190);
                &:focus{
                    outline: none;
                }
                &::-webkit-input-placeholder{
                    font-size: px2rem(12);
                    color: rgb(190, 190, 190);
                }
            }
        }
        .icon-clear-wrapper{
            flex: 0 0 px2rem(24);
            @include left;
            .icon-close{
                position: absolute;
                top: px2rem(6);
                font-size: px2rem(14);
                color: rgb(190, 190, 190);
            }
        }
    }
    .shelf-search-table-wrapper{
        position: absolute;
        top: px2rem(45);
        left: 0;
        z-index: 105;
        display: flex;
        width:100%;
        height: px2rem(50);
        padding-bottom: px2rem(15);
        box-sizing: border-box;
        .shelf-search-table-item{
            flex: 1;
            @include center;
            .shelf-search-tab-text{
                font-size: px2rem(12);
                color: #999;
                &.is-selected{
                    color:rgb(116, 181, 255);
                }
            }
        }
    }
}
</style>