<template>
<transition name="fade-slide-right" appear>
  <div class="slide-content-wrapper" v-if="menuVisible && settingVisible === 3">
      <div class="content">
          <div class="content-page-wrapper" v-if="bookAvailable">
              <div class="content-page">
                  <component :is="currentTab === 1 ? content : bookMark "></component>
              </div>
              <div class="content-page-tab">
                  <div class="content-page-tab-item" :class="{'selected':currentTab === 1}"
                  @click="selectTab(1)">目录</div>
                  <div class="content-page-tab-item" :class="{'selected':currentTab === 2}"
                  @click="selectTab(2)">书签</div>
              </div> 
          </div>
          <div class="content-empty" v-else>
              <ebook-loading></ebook-loading>
          </div>
      </div>
      <div class="content-bg" @click="hideTitleAndMenu()"></div>
  </div>
</transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import ebookLoading from './ebookLoading.vue'
import ebookSlideBookmark from './ebookSlideBookmark.vue'
import ebookSlideContent from './ebookSlideContent'
export default {
  components: { ebookLoading },
    mixins:[ebookMixin],
    methods:{
       selectTab(value){
           this.currentTab = value
       }
    },
    data(){
        return {
            currentTab:1,
            content:ebookSlideContent,
            bookMark:ebookSlideBookmark
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
.slide-content-wrapper{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    left: 0;
    z-index: 301;
    .content{
        flex: 0 0 85%;
        width: 85%;
        height: 100%;
        .content-page-wrapper{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            .content-page{
                flex: 1;
                width: 100%;
                overflow: hidden;
            }
            .content-page-tab{
                display: flex;
                flex: 0 0 px2rem(48);
                width: 100%;
                height: px2rem(48);
                .content-page-tab-item{
                    flex:1;
                    font-size: px2rem(12);
                    @include center;
                }
            }
        }
        .content-empty{
            width: 100%;
            height: 100%;
            @include center;
        }
    }
    .content-bg{
        flex: 0 0 15%;
        width: 15%;
        height: 100%;
    }
}
</style>