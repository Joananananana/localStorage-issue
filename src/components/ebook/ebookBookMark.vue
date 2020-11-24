<template>
  <div class="ebook-bookmark" ref="bookmarks">
      <div class="ebook-bookmark-text-wrapper">
          <div class="ebook-bookmark-down-wrapper" ref="icondown">
              <span class="icon-down">↓</span>
          </div>
          <div class="ebook-bookmark-text">{{text}}</div>
      </div>
      <div class="ebook-bookmark-icon-wrapper" :style="isFixed?fixedStyle : {}">
         <bookmark :color="color" :width="15" :height="35"></bookmark>
      </div>
  </div>
</template>

<script>
import { realPx } from '../../utils/utils'
import Bookmark from '../common/Bookmark.vue'
import {ebookMixin} from '../../utils/mixin'
import {getBookmark,saveBookmark} from '../../utils/localStorage'
export default {
    mixins:[ebookMixin],
    components:{Bookmark},
    data(){
        return{
            text:'',
            color:'',
            isFixed:false
        }
    },
    watch:{
        offsetY(v){
            if(!this.bookAvailable || this.menuVisible || this.settingVisible >= 0){return }
            if(v >= this.height && v<= this.threshold){
                this.$refs.bookmarks.style.top = `${-v}px`
                if(this.isBookmark){
                    this.text="下拉删除书签"
                    this.color="#346cbc"
                    this.isFixed = true
                }else{
                    this.text="下拉添加书签"
                    this.color='#fff'
                    this.isFixed = false
                }
                const iconDown = this.$refs.icondown
                 if(iconDown.style.transform === 'rotate(180deg)'){
                   iconDown.style.transform = 'rotate(0deg)'
               }
            }else if(v >= this.threshold){
                this.$refs.bookmarks.style.top = `${-v}px`
                if(this.isBookmark){
                    this.text="松手删除书签"
                    this.color="#fff"
                    this.isFixed = false
                }else{
                    this.text="松手添加书签"
                    this.color="#346cbc"
                    this.isFixed = true
                }
                const iconDown = this.$refs.icondown
                if(iconDown.style.transform === 'rotate(0deg)' || iconDown.style.transform === ''){
                   iconDown.style.transform = 'rotate(180deg)'
               }
            }else if(v > 0 && v < this.height){
                if(this.isBookmark){
                    this.text="下拉删除书签"
                    this.color="#346cbc"
                }else{
                    this.text="下拉添加书签"
                    this.color='#fff'
                }
                this.isFixed = false
            }else if( v === 0){
                this.restore()
            }
        },
        isBookmark(isBookmark){
            if(isBookmark){
                this.color ="#346cbc"
                this.isFixed = true
            }else{
                this.color = "#fff"
                this.isFixed = false
            }
        }
    },
    computed:{
        height(){
            return realPx(35)
        },
        threshold(){
            return realPx(55)
        },
        fixedStyle(){
            return {
                position:'fixed',
                right:` px2rem(10)`,
                //opacity:`0.8`,
                top:0
            }
        }
    },
    methods:{
        restore(){
            setTimeout(() => {
                this.$refs.bookmarks.style.top = `${-this.height}px`
                this.$refs.icondown.style.transform = 'rotate(0deg)'
            },200)
            if(this.isFixed){
                this.setIsBookmark(true)
                this.addBookmark()
            }else{
                this.setIsBookmark(false)
                this.removeBookmark()
            }
        },
        addBookmark(){
            this.bookmark = getBookmark(this.fileName)
            if(!this.bookmark){
                this.bookmark = []
            }
            const currentLocation = this.currentBook.rendition.currentLocation()
            const cfibase = currentLocation.start.cfi.replace(/!.*/,'')
            const cfiStart = currentLocation.start.cfi.replace(/.*!/,'').replace(/\)$/,'')
            const cfiEnd = currentLocation.end.cfi.replace(/.*!/,'').replace(/\)$/,'')
            const cfirange = `${cfibase}!,${cfiStart},${cfiEnd})`
            this.currentBook.getRange(cfirange).then(Range => {
                const text = Range.toString().replace(/\s\s/g,'')
                this.bookmark.push({
                    cfi:currentLocation.start.cfi,
                    text:text
                })
                saveBookmark(this.fileName,this.bookmark)
            })
        },
        removeBookmark(){
            const currentLocation = this.currentBook.rendition.currentLocation()
            const cfi = currentLocation.start.cfi
            this.bookmark = getBookmark(this.fileName)
            if(this.bookmark){
                this.bookmark = this.bookmark.filter(item => item.cfi != cfi)
                saveBookmark(this.fileName)
                this.setIsBookmark(false)
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
.ebook-bookmark{
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    background: #7d8188;
    .ebook-bookmark-text-wrapper{
        position: absolute;
        right: px2rem(45);
        bottom: 0;
        display: flex;
        .ebook-bookmark-down-wrapper{
            font-size: px2rem(14);
            color: white;
            transition: all .2s linear;
            @include center;
        }
        .ebook-bookmark-text{
            font-size: px2rem(14);
            color:white;
        }
    }
    .ebook-bookmark-icon-wrapper{
        position: absolute;
        right: px2rem(10);
        bottom: 0;
        margin-left: px2rem(15);
    }
}
</style>