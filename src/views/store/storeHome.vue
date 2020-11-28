<template>
  <div class="store-home">
      <search-bar :FlapCard="FlapCard"></search-bar>
      <flap-card :data="random" ref="flapCard"></flap-card>
      <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
          <div class="banner-wrapper">
              <img :src="banner" class="banner-img">
          </div>
          <guess-you-like :data="guessYouLike"></guess-you-like>
          <recommend :data="recommend" class="recommend"></recommend>
          <featured class="feature" :data="feature" :titleText="titleText" :btnText="btnText"></featured>
          <div class="category-list-wrapper"  v-for="(item,index) in categoryList" :key="index">
              <category-book :data="item"></category-book>
          </div>
          <category class="category" :data="categories"></category>
      </scroll>
  </div>
</template>

<script>
import Scroll from '../../components/common/Scroll.vue'
import FlapCard from '../../components/home/flapCard.vue'
import SearchBar from '../../components/home/searchBar.vue'
import { storeHomeMixin } from '../../utils/mixin'
import {home} from '../../api/store'
import guessYouLike from '../../components/home/GuessYouLike'
import recommend from '../../components/home/Recommend'
import featured from '../../components/home/Featured'
import CategoryBook from '../../components/home/CategoryBook.vue'
import category from '../../components/home/Category'
export default {
    mixins:[storeHomeMixin],
    components:{
        SearchBar,
        Scroll,
        FlapCard,
        guessYouLike,
        recommend,
        featured,
        CategoryBook,
        category
    },
    methods:{  
        onScroll(offsetY){
            this.setOffsetY(offsetY)
            if(offsetY > 0){
                this.scrollTop = 46
            }else{
                this.scrollTop = 88
            }
            this.$refs.scroll.refresh()
        },
        FlapCard(){
            return this.$refs.flapCard.runAnimation()
        }
    },
    data(){
        return{
            scrollTop:88,
            random:null,
            banner:null,
            guessYouLike:null,
            recommend:null,
            feature:null,
            titleText:"精选",
            btnText:"查看全部",
            categoryList:null,
            categories:null
        }
    },
    mounted(){
        home().then(Response =>{
           if(Response && Response.status === 200){
               const data = Response.data
                         
               const randomIndex = Math.floor( Math.random() * data.random.length )
               this.random = data.random[randomIndex]
               this.banner = process.env.VUE_APP_RES_URL + '/img.jpg'
               this.guessYouLike = data.guessYouLike
               this.recommend = data.recommend
               this.feature = data.featured
               this.categoryList = data.categoryList
               this.categories = data.categories
           }
        })
    }
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
.store-home{
    width: 100%;
    height: 100%;
    background: white;
    .banner-wrapper{
        padding: px2rem(10);
        box-sizing: border-box;
        width: 100%;
        .banner-img{
            width: 100%;
            height: px2rem(130);
        }
    }
    .recommend{
        margin-top: px2rem(20);
    }
    .feature,.category-list-wrapper,.category{
        margin-top: px2rem(20);
    }
}
</style>