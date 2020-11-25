<template>
  <div class="ebookReader">
      <div id="read"></div>
      <div class="ebook-reader-mack" @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseUp"
      ></div>
  </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
import Epub from 'epubjs'
import { off } from 'process'
import {themeList} from '@/utils/book.js'
import { getLocation } from '@/utils/localStorage.js'
import { flatten } from '../../utils/book'
export default {
    mixins:[ebookMixin],
    methods:{
        onMouseEnter(e){
            this.mouseState = 1
            e.preventDefault()
            e.stopPropagation()
        },
        onMouseMove(e){
            if(this.mouseState === 1){
                this.mouseState = 2
            }else if(this.mouseState === 2){
                let offsetY = 0
                if(this.firstOffsetY){
                    offsetY = e.clientY - this.firstOffsetY
                    this.setOffsetY(offsetY)
                }
                else{this.firstOffsetY = e.clientY}
            }
            e.preventDefault()
            e.stopPropagation()
        },
        onMouseUp(e){
            if(this.mouseState === 2){
                this.setOffsetY(0)
                this.firstOffsetY = null
                this.mouseState = 3
            }else{
                this.mouseState = 4
            }
            e.preventDefault()
            e.stopPropagation()
        },
        onMaskClick(e){
            if(this.mouseState ===2 || this.mouseState ===3){
               return
            }
            const offsetX = e.offsetX
            const width = window.innerWidth
            if(offsetX > 0 && offsetX < width * 0.3){
                this.prevPage()
            }else if(offsetX > 0 && offsetX > width * 0.7){
                this.nextPage()
            }else{
                this.toggleTitleAndMenu()
            }
        },
        move(e){
            let offsetY = 0
            if(this.firstOffsetY){
                offsetY = e.changedTouches[0].clientY - this.firstOffsetY
                this.setOffsetY(offsetY)
            }
            else{this.firstOffsetY = e.changedTouches[0].clientY}
            e.preventDefault()
            e.stopPropagation()
                    },
        moveEnd(e){
            this.setOffsetY(0)
            this.firstOffsetY = null
        },
        prevPage(){
            if(this.rendition){
                this.rendition.prev().then(() => {this.refreshLocation()})
                this.hideTitleAndMenu()
            }
        },
        nextPage(){
            if(this.rendition){
                this.rendition.next().then(() => {this.refreshLocation()})
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
        initTheme(){
            themeList.forEach(theme => {
                this.rendition.themes.register(theme.name,theme.style)
            })
            this.rendition.themes.select(this.defaultTheme)
        },
        parseBook(){
            this.book.loaded.cover.then((cover) => {
                this.book.archive.createUrl(cover).then(url => {
                    this.setCover(url)
                })
            })
            this.book.loaded.metadata.then(metadata => {
                console.log(metadata)
                this.setMetadata(metadata)
            })
            this.book.loaded.navigation.then( nav => {
                const navIten = flatten(nav.toc)
                function find(item,level = 0){
                if(!item.parent){
                    return level
                }else{
                    return find(navigation.filter(parentItem => parentItem.id === item.parent)[0],++level)
                }
                }
                navIten.forEach(item => {item.level = find(item)
                })
                this.setNavigation(navIten)
             })
            },
        initEpub(){
            const URL =process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
            console.log(URL)
            this.book = new Epub(URL)
            console.log(this.book)
            this.setCurrentBook(this.book)
            this.rendition = this.book.renderTo(('read'),{
                width:innerWidth,
                height:innerHeight,
                method:'default' //weixin也能正常显示
            })
            const location = getLocation(this.fileName)
            this.display(location,() => {
                console.log('display')
                this.initTheme()
                this.initGlobalStyle()
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
            this.book.ready.then(() => {
                return this.book.locations.generate(750 * (window.innerWidth / 375) *( (this.defaultFontSize) / 16))
            }).then(() =>{
                this.setBookAvailable(true)
                this.refreshLocation()
            })
            this.parseBook()
            }//分页  
    },
    mounted(){
        const fileName = this.$route.params.fileName.split('|').join('/')
        console.log(fileName)
        this.setFileName(fileName).then(() => {
            console.log('AA')
            this.initEpub()
        })
        
    }
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
.ebookReader{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-reader-mack{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
        top: 0;
        left: 0;
        background: transparent;
    }
}
</style>