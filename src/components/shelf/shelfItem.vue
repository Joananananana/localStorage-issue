<template>
  <div class="shelf-item" :class="{'shlef-item-shadow':data.type ===1 || data.type ===2}"
  @click="onItemClick">
      <component :is="item" :data="data" class="shelf-item-component" :class="{'is-edit':data.type ===2 && isEditMode}"></component>
      <div class="shelf-item-select-icon icon-select" v-show="isEditMode && data.type === 1"
      :class="{'is-selected':data.selected}"
      ></div>
  </div>
</template>

<script>
import {storeShelfMixin} from '../../utils/mixin'
import shelfItemOne from './shelfItemOne'
import shelfItemTwo from './shelfItemTwo'
import shelfItemThree from './shelfItemThree'
import { gotoStoreHome }from '../../utils/store'
export default {
    mixins:[storeShelfMixin],
    components:{
        shelfItemThree,shelfItemTwo,shelfItemOne
    },
    props:{
        data:Object
    },
    computed:{
        item(){
            return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
        }
    },
    data(){
        return {
            book:shelfItemOne,
            category:shelfItemTwo,
            add:shelfItemThree
        }
    },
    methods:{
        onItemClick(){
            if(this.isEditMode){
                this.data.selected = !this.data.selected
                if(this.data.selected){
                    this.shelfSelected.pushWithoutDuplicate(this.data)
                }else{
                    this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
                }
            }else{
                if(this.data.type === 1){
                  this.showBookDetail(this.data)
                }else if(this.data.type ===2){

                }else{
                    gotoStoreHome(this)
            }
            }
            
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/global";
.shelf-item{
    position: relative;
    width: 100%;
    height: 100%;
    &.shlef-item-shadow{
        box-shadow: px2rem(3) px2rem(3) px2rem(5)  rgba(117, 115, 115, 0.3);
    }
    .icon-select{
        position: absolute;
        bottom: px2rem(2);
        right: px2rem(2);
        font-size: px2rem(18);
        color: rgba(0,0,0,.4);
        &.is-selected{
            color: rgb(60, 164, 233);
        }
    }
    .shelf-item-component{
        opacity: 1;
        &.is-edit{
            opacity: 50%;
        }
    }
}
</style>