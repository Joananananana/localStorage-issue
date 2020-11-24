<template>
  <div class="menu-bar">
        <transition name="slide-up">
          <div class="menu-wrapper" v-show="menuVisible"
          :class="{'hide-box-shadow':settingVisible >= 0 || !menuVisible}">
          <div class="icon-wrapper">
              <span class="icon-menu icon" @click="showSetting(3)"></span>
          </div>
          <div class="icon-wrapper">
              <span class="icon-progress icon" @click="showSetting(2)"></span>
          </div>
          <div class="icon-wrapper">
              <span class="icon-brightness icon" @click="showSetting(1)"></span>
          </div>
          <div class="icon-wrapper">
              <span class="icon-a icon" @click="showSetting(0)">A</span>
          </div>
          </div>
        </transition>
        <settingFont></settingFont>
        <settingFontPopup></settingFontPopup>
        <EbookSettingTheme></EbookSettingTheme>
        <ebook-setting-progress></ebook-setting-progress>
        <ebook-slide></ebook-slide>
      </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
import settingFont from './ebookSettingFont'
import settingFontPopup from './ebookSettingFontPopup'
import EbookSettingProgress from './ebookSettingProgress.vue'
import EbookSettingTheme from './ebookSettingTheme.vue'
import EbookSlide from './ebookSlide.vue'
export default {
    mixins:[ebookMixin],
    components:{
        settingFont,settingFontPopup,
        EbookSettingTheme,
        EbookSettingProgress,
        EbookSlide
    },
    methods:{
        showSetting(key){
            this.setSettingVisible(key)
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
.menu-wrapper{
        position: absolute;
        display: flex;
        bottom:0;left:0;
        width: 100%;
        height: px2rem(48);
        z-index:201;
        background: white;
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
        &.hide-box-shadow{
            box-shadow:none;
        }
        .icon-wrapper{
            flex:1;
            @include center;
        }
    }
</style>