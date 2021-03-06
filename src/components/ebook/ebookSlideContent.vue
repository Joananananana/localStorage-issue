<template>
  <div class="ebook-slide-contents">
      <div class="slide-contents-search-wrapper">
          <div class="slide-contents-search-input-wrapper">
              <div class="slide-contents-search-icon">
                  <span class="icon-menu"></span>
              </div>
              <input type="text" class="slide-contents-search-input" placeholder="搜索全书内容" @click="showSearchPage()"
              v-model="searchText"
              @keyup.enter.exact="search()"
              >
          </div>
          <div class="slide-contents-search-cancel" v-if="searchVisible" @click="hideSearchPage()">取消</div>
      </div>
      <div class="slide-contents-book-wrapper" v-show="!searchVisible">
          <div class="slide-contents-book-img-wrapper">
              <img :src="cover" class="slide-contents-book-img">
          </div>
          <div class="slide-contents-book-info-wrapper">
              <div class="slide-contents-book-title">{{metadata.title}}</div>
              <div class="slide-contents-book-author">{{metadata.creator}}</div>
          </div>
          <div class="slide-contents-book-progress-wrapper">
              <div class="slide-contents-book-progress">
                  <span class="progress">{{progress + '%'}} 已读</span>
              </div>
          </div>
      </div>
      <scroll class="slide-contents-list" :top="156" :bottom="48" v-show="!searchVisible">
          <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
              <span class="slide-contents-item-label" :style="contentItemStyle(item)"
              :class="{'selected':section === index}"
              @click="displayNav(item.href)"
              >{{item.label}}</span>
              <span class="slide-contents-item-page"></span>
          </div>
      </scroll>
      <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
          <div class="slide-search-item" v-for="(item,index) in searchList" :key="index" v-html="item.excerpt" @click="displaySearch(item.cfi,true)"></div>
      </scroll>
  </div>
</template>

<script>
import {ebookMixin} from '../../utils/mixin'
import Scroll from '../common/Scroll'
import {px2rem} from '../../utils/utils'
export default {
    components:{Scroll},
    mixins:[ebookMixin],
    data(){
        return {
            searchVisible:false,
            searchList:null,
            searchText:''
        }
    },
    methods:{
        hideSearchPage(){
            this.searchVisible = false
            this.searchText=''
            this.searchList=null
        },
        showSearchPage(){
            this.searchVisible = true
        },
        contentItemStyle(item){
            return {
                marginLeft:`${px2rem(item.level * 15)}rem`
            }
        },
        displayNav(target){
            return this.display(target,() => {
                this.hideTitleAndMenu()
            })
        },
        doSearch(q){
            return Promise.all(
                this.currentBook.spine.spineItems.map(
                    item => item.load(this.currentBook.load.bind(this.currentBook))
                    .then(item.find.bind(item,q))
                    .finally(item.unload.bind(item)))
            ).then(results => Promise.resolve([].concat.apply([],results)))      
        }, //搜索算法
        search(){
            if(this.searchText && this.searchText.length > 0){
                this.doSearch(this.searchText).then(list => { 
                    this.searchList=list
                    this.searchList.map(item => {
                        item.excerpt = item.excerpt.replace(this.searchText,`<span class="content-search-text">${this.searchText}</span>`)
                    })
                    })
            }
        },
        displaySearch(target,highLight = false){
            return this.display(target,() => {
                this.hideTitleAndMenu()
                if(highLight){
                    this.currentBook.rendition.annotations.highlight(target)
                }
            })
        }
    },
    mounted(){
       //this.doSearch('学会').then(list => {this.searchList=list})
    }
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
.ebook-slide-contents{
    width: 100%;
    .slide-contents-search-wrapper{
        display: flex;
        width: 100%;
        height: px2rem(36);
        margin: px2rem(20) 0 px2rem(10) 0;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-contents-search-input-wrapper{
            flex: 1;
            @include center;
            .slide-contents-search-icon{
                flex: 0 0 px2rem(28);
                @include center;
                font-size: px2rem(12);
                }
            }
            .slide-contents-search-input{
                flex: 1;
                width: 100%;
                height: px2rem(32);
                font-size: px2rem(14);
                background:transparent;
                border: none;
                &:focus{
                    outline: none;
                }
            }
            .slide-contents-search-cancel{
            flex: 0 0 px2rem(50);
            font-size: px2rem(14);
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        }
    .slide-contents-book-wrapper{
        display: flex;
        width: 100%;
        height: px2rem(90);
        padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
        box-sizing: border-box;
        .slide-contents-book-img-wrapper{
            flex: 0 0 px2rem(45);
            .slide-contents-book-img{
                width: px2rem(45);
                height: px2rem(60);
            }
        }
        .slide-contents-book-info-wrapper{
            flex: 1;
            padding: 0 px2rem(10);
            box-sizing: border-box;
            .slide-contents-book-title{
                font-size: px2rem(14);
                padding: px2rem(5) px2rem(10);
                display: -webkit-box;
                width: px2rem(150);
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                white-space: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;//任何时候单词都换行
                line-height: px2rem(16);
            }
            .slide-contents-book-author{
                 font-size: px2rem(10);
                 line-height: px2rem(20);
                 padding: px2rem(5) px2rem(10);
            }
        }
        .slide-contents-book-progress-wrapper{
            flex: 0 0 px2rem(70);
            .slide-contents-book-progress{
                .progress{
                     font-size: px2rem(12);
                }
            }
        }
    }
    .slide-contents-list{
        padding: 0 px2rem(15);
        box-sizing: border-box;;
        .slide-contents-item{
            padding: px2rem(20) 0;
            box-sizing: border-box;
            display: flex;
            .slide-contents-item-label{
                font-size: px2rem(14);
                flex:1;
            }
            .slide-contents-item-page{}
        }
    }
    .slide-search-list{
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .slide-search-item{
            font-size: px2rem(14);
            line-height: px2rem(16);
            padding: px2rem(20) 0;
            box-sizing: border-box;
            width: 100%;;
        }
    }
    }

</style>