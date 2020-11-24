<template>
  <div class="ebook" ref="ebook">
      <ebook-title></ebook-title>
      <ebook-reader></ebook-reader>
      <ebook-menu></ebook-menu>
      <ebook-book-mark></ebook-book-mark>
  </div>
</template>

<script>
import EbookBookMark from '../../components/ebook/ebookBookMark.vue'
import EbookMenu from '../../components/ebook/ebookMenu.vue'
import ebookReader from '../../components/ebook/ebookReader.vue'
import EbookTitle from '../../components/ebook/ebookTitle.vue'
import {getReadTime, saveReadTime} from '../../utils/localStorage'
import {ebookMixin} from '../../utils/mixin'
export default {
  mixins:[ebookMixin],
  components: { ebookReader, EbookTitle, EbookMenu, EbookBookMark },
  methods:{
    startLoopReadTime(){
      let ReadTime = getReadTime(this.fileName)
      if(!ReadTime){
        ReadTime = 0
      }
      this.task = setInterval(() => {
        ReadTime++
        if(ReadTime % 30 ===0){
          saveReadTime(this.fileName,ReadTime)
        }
      },1000)
    },
    move(v){
      this.$refs.ebook.style.top = v+'px'
    },
    restore(){
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = 'all .2s linear'
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      },200)
    }
  },
  mounted(){
    this.startLoopReadTime()
  },
  beforeDestroy(){
    if(this.task){
      clearInterval(this.task)
    }
  },
  watch:{
    offsetY(v){
      if(!this.menuVisible && this.bookAvailable){
          if(v > 0){
          this.move(v)
        }else if(v === 0){
          this.restore()
        }
      }
    }
  }
}
</script>

<style lang="scss">
    @import "@/assets/global.scss";
    .ebook{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
</style>