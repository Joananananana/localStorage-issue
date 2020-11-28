<template>
<div>
  <div class="search-bar" :class="{'hide-title':!titleVisible,'hide-shadow':!shadowVisible}">
      <transition name="title-move" appear>
      <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
              <span class="title-text">书城</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
              <span class="icon-tuijian icon"></span>
          </div>
      </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title':!titleVisible}" @click="back">
              <span class="icon-qianjin icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title':!titleVisible}">
          <div class="search-bar-blank" :class="{'hide-title':!titleVisible}"></div>
          <div class="search-bar-input">
              <span class="icon-search icon"></span>
              <input type="text" class="input" placeholder="别为小事抓狂"
              v-model="searchText" 
              @click="showHotSearch"
              @keyup.enter.exact="search"
              >
          </div>
      </div>
  </div>
  <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>

<script>
import { storeHomeMixin } from '../../utils/mixin'
import hotSearchList from './hotSearchList.vue'
export default {
    components: { hotSearchList },
    mixins:[storeHomeMixin],
    data(){
        return {
            searchText:'',
            titleVisible:true,
            shadowVisible:false,
            hotSearchVisible:false
        }
    },
    watch:{
        offsetY(offsetY){
            if(offsetY>0){
                this.hideTitle()
                this.showShadow()
            }else{
                this.showTitle()
                this.hideShadow()
            }
        },
        hotSearchOffsetY(offsetY){
            if(offsetY > 0){
                this.showShadow()
            }else{
                this.hideShadow()
            }
        }
    },
    methods:{
        hideTitle(){
            this.titleVisible = false
        },
        showTitle(){
            this.titleVisible = true
        },
        hideShadow(){
            this.shadowVisible = false
        },
        showShadow(){
            this.shadowVisible = true
        },
        hideHotSearch(){
            this.hotSearchVisible = false
            if(this.offsetY > 0){
                this.hideTitle()
                this.showShadow()
            }else{
                this.showTitle()
                this.hideShadow()
            }
        },
        showHotSearch(){
            this.hideTitle()
            this.hideShadow()
            this.hotSearchVisible = true
            this.$nextTick(() => {
                this.$refs.hotSearch.reset()
            })
        },
        back(){
            if(this.offsetY > 0){
                this.showShadow()
            }else{
                this.hideShadow()
            }
            if(this.hotSearchVisible){
                this.hideHotSearch()
            }else{
                this.$router.push('/store/shelf')
            }
        },
        showFlapCard(){
            this.setFlapCardVisible(true)
            this.FlapCard() 
            this.setRunFlapCardAnimation(true)
        },
        search(){
            this.$router.push({
                path:'/store/list',
                query:{
                    keyword:this.searchText
                }
            })
        }
    },
    props:{
        FlapCard:Function
    }
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
.search-bar{
    position:relative;
    width: 100%;
    z-index: 101;
    height: px2rem(88);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-title{
        height: px2rem(46);
    }
    &.hide-shadow{
        box-shadow: none;
    }
    .search-bar-title-wrapper{
        width: 100%;
        height: px2rem(42);
        position: absolute;
        top:0;
        left: 0;
        .title-text-wrapper{
            width: 100%;
            height: px2rem(42);    
            @include center;
            .title-text{
                font-size: px2rem(16);
            }
        }
        .title-icon-shake-wrapper{
            position: absolute;
            right: px2rem(15);
            top:0;
            height: px2rem(42);
            @include center;
        }
    } 
    .title-icon-back-wrapper{
            position: absolute;
            left: px2rem(15);
            top:0;
            height: px2rem(42);
            z-index: 200;
            transition: all .2s linear;
            @include center;
            &.hide-title{
                height: px2rem(48);
                left:px2rem(5)
                
            }
        }
    .search-bar-input-wrapper{
        position: absolute;
        left:0;
        display: flex;
        top: px2rem(42);
        width: 100%;
        height: px2rem(46);
        padding: px2rem(5);
        box-sizing: border-box;
        transition: top .2s linear;
        &.hide-title{
            top: 0;
        }
        .search-bar-blank{
            flex:0;
            width: 0;
            transition: all .2s linear;
            &.hide-title{
                flex:0 0 px2rem(31);
                width:px2rem(31);
            }
        }
        .search-bar-input{
            flex: 1;
            border-radius: px2rem(20);
            width: 100%;
            background: #f4f4f4;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: px2rem(5) px2rem(15);
            box-sizing: border-box;
            border:px2rem(1) solid #eee;
            .icon-search{
                color: #ccc;
            }
            .input{
                height: px2rem(20);
                width: 100%;
                border: none;
                background: transparent;
                margin-left: px2rem(10);
                font-size: px2rem(12);
                color: #666;
                &:focus{
                    outline: none;
                }
                &::-webkit-input-placeholder{
                    color: #ccc;
                }
            }
        }
    }
}

</style>