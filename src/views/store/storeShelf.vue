<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll :top="0" :bottom="scrollBottom" class="store-shelf-scroll-wrapper" @onScroll="onScroll" ref="scroll">
      <shelf-search></shelf-search>
      <shelf-list></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import Scroll from '../../components/common/Scroll.vue'
import shelfTitle from '../../components/shelf/shelfTitle.vue'
import shelfSearch from "../../components/shelf/shelfSearch.vue"
import { storeShelfMixin } from '../../utils/mixin'
import {shelf} from '@/api/store.js'
import ShelfList from '../../components/shelf/shelfList.vue'
import { appendAddToShelf } from '../../utils/store'
import ShelfFooter from '../../components/shelf/shelfFooter.vue'
export default {
  mixins:[storeShelfMixin],
  components: { shelfTitle, Scroll,shelfSearch, ShelfList, ShelfFooter },
  methods:{
    getShelfList(){
      shelf().then(response => {
        if(response.status === 200 && response.data &&response.data.bookList){
          this.setShelfList(appendAddToShelf(response.data.bookList))
        }
      })
    },
    onScroll(offsetY){
      this.setOffsetY(offsetY)
    }
  },
  mounted(){
    this.getShelfList()
  },
  data(){
    return {
      scrollBottom:0
    }
  },
  watch:{
    isEditMode(isEditMode){
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="scss">
 @import "../../assets/global";
   .store-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;
    .store-shelf-scroll-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
  }
</style>