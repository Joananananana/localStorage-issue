<template>

  <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
          <div class="ebook-popup-title-icon" @click="hide">
              <span class="icon-uniE900"></span>
          </div>
          <div class="ebook-popup-title-text">选择字体</div>
      </div>
      <div class="ebook-popup-list-wrapper">
          <div class="ebook-popup-item" v-for="(item,index) in fontFamilyList" :key="index" @click="setFontFamily(item.font)">
              <div class="ebook-popup-item-text" :class="{'selected':isSelected(item)}">{{item.font}}</div>
              <div class="ebook-popup-item-check" v-if="isSelected(item)" >
                  <span>√</span>
              </div>
              
          </div>
      </div>
  </div>
</template>

<script>
import { FONT_FAMILY } from '../../utils/book'
import {ebookMixin} from '../../utils/mixin'
export default {
    mixins:[ebookMixin],
    data(){
        return{
            fontFamilyList:FONT_FAMILY
        }
    },
    methods:{
        hide(){
            this.setFontFamilyVisible(false)
        },
        isSelected(item){
            return this.defaultFontFamily === item.font
        },
        setFontFamily(font){
            this.setDefaultFontFamily(font)
            this.currentBook.rendition.themes.font()
        }
    }
    
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
.ebook-popup-list{
    position:absolute;
    bottom:0;
    left:0;
    z-index:300;
    background: white;
    width: 100%;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0,0,0,.1);
    .ebook-popup-title{
        position: relative;
        padding: px2rem(15);
        border-bottom: px2rem(1) solid #b8b9bb;
        box-sizing: border-box;
        text-align:center;
        .ebook-popup-title-icon{
            position: absolute;
            left: px2rem(15);
            top: 0;
            height: 100%;
            @include center;
            font-size: px2rem(14);
        }
        .ebook-popup-title-text{
            font-size: px2rem(14);
            font-weight: bold;
        }
    }
    .ebook-popup-list-wrapper{
        .ebook-popup-item{
             display: flex;
             padding:px2rem(15);
            .ebook-popup-item-text{
                flex:1;
                font-size: px2rem(14);
                text-align: left;
                &.selected{
                    color: #346cd9;
                    font-weight: bold;
                }
            }
            .ebook-popup-item-check{
                flex:1;
                text-align: right;
                font-size: px2rem(14);
                color: #346cd9;
                font-weight: bold;
            }
        }
    }
}
</style>