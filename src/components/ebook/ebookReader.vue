<template>
  <div class="ebookReader">
      <div id="read">

      </div>
  </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
import epub from 'epubjs'
import Epub from 'epubjs'
import { off } from 'process'
import {themeList} from '@/utils/book.js'
import { getLocation } from '@/utils/localStorage.js'
export default {
    mixins:[ebookMixin],
    methods:{
        prevPage(){
            if(this.rendition){
                this.rendition.prev().then(()=>{this.refreshLocation()})
                this.hideTitleAndMenu()
            }
        },
        nextPage(){
            if(this.rendition){
                this.rendition.next().then(()=>{this.refreshLocation()})
                this.hideTitleAndMenu()
            }
        },
        toggleTitleAndMenu(){
            if(this.menuVisible){
                this.setSettingVisible(-1)
                this.setFontFamilyVisible(false)
            }
            this.setMenuVisible(!this.menuVisible)
        },
        hideTitleAndMenu(){
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
        initTheme(){
            themeList.forEach(theme => {
                this.rendition.themes.register(theme.name,theme.style)
            })
            this.rendition.themes.select(this.defaultTheme)
        },
        initEpub(){
            const URL =process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
            this.book = new Epub(URL)
            this.setCurrentBook(this.book)
            this.rendition = this.book.renderTo(('read'),{
                width:innerWidth,
                height:innerHeight,
                method:'default' //weixin也能正常显示
            })
            this.display(null,() => {
                this.initTheme()
                this.initGlobalStyle()
                this.refreshLocation()
            })
            this.rendition.on('touchstart',event => {
                this.touchStartX = event.changedTouches[0].clientX
                this.touchStartTime = event.timeStamp
            })
            this.rendition.on('touchend',event => {
                const offsetX = event.changedTouches[0].clientX - this.touchStartX
                const time = event.timeStamp - this.touchStartTime
                if(time<500 && offsetX>40) {
                    this.prevPage()
                }else if (time<500 && offsetX<-40){
                    this.nextPage()
                }else{
                    this.toggleTitleAndMenu()
                }
                event.preventDefault()
                event.stopPropagation()
            })
            this.rendition.hooks.content.register(contents => {
                contents.addStylesheet('')//还没实现
            })
            this.book.ready.then(() => {
                return this.book.locations.generate(750 * (window.innerWidth / 375) *( (this.defaultFontSize) / 16))
            }).then(() =>{
                this.setBookAvailable(true)
            })}//分页
    },
    mounted(){
        const fileName = this.$route.params.fileName.split('|').join('/')
        this.setFileName(fileName).then(() => {
            this.initEpub()
        })
        
    }
}
</script>

<style>

</style>