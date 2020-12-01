<template>
  <div class="shelf-list">
      <div v-for="item in shelfList" :key="item.id" class="shelf-list-item-wrapper">
          <shelf-item :data="item" :style="{height:itemHeight}"></shelf-item>
          <div class="shelf-list-item-title-wrapper">
              <span class="shelf-list-title title-small">{{item.title}}</span>
          </div>
      </div>
  </div>
</template>

<script>
import {storeShelfMixin} from '../../utils/mixin'
import { realPx } from '../../utils/utils'
import shelfItem from './shelfItem'
export default {
    mixins:[storeShelfMixin],
    components:{
        shelfItem
    },
    computed:{
        itemHeight(){
            return (((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px' )
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/global";
.shelf-list{
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .shelf-list-item-wrapper{
        flex: 0 0 33.33%;
        width:33.33%;
        padding: px2rem(15);
        box-sizing: border-box;
        .shelf-list-item-title-wrapper{
            margin-top: px2rem(8);
        }
    }
}
</style>