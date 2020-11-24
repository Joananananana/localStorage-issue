<template>
 
        <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
            <div class="setting-theme" >
                <div class="setting-theme-item" v-for="(item,index) in themeList" :key="index" @click="setTheme(index)">
                    <div class="preview" :style="{background:item.style.body.background}" ></div>
                    <div class="text" :class="{'selected':item.name === defaultTheme}">{{item.name}}</div>
                </div>
            </div>
        </div>
     
</template>

<script>
import { themeList } from '../../utils/book'
import {ebookMixin} from '../../utils/mixin'
export default {
    mixins:[ebookMixin],
    computed:{
        themeList(){
            return themeList
        }
    },
    methods:{
        setTheme(index){
            const theme = this.themeList[index]
            this.setDefaultTheme(theme.name).then(() => {
                this.currentBook.rendition.themes.select(this.defaultTheme)
                this.initGlobalStyle()
            })
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/global.scss";
    .setting-wrapper{
        position: absolute;
        bottom:px2rem(48);
        left:0;
        width:100%;
        height:px2rem(90);
        box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
        background: white;
        z-index: 201;
        .setting-theme{
            height: 100%;
            display: flex;
            .setting-theme-item{
                padding: px2rem(5);
                box-sizing: border-box;
                flex: 1;
                display: flex;
                flex-direction: column;
                .preview{
                    flex: 1;
                    border:px2rem(1) solid white;
                    box-sizing: border-box;
                    
                }
                .text{
                    flex: 0 0 px2rem(30);
                    font-size:px2rem(14);
                    color:#ccc;
                    @include center;
                    &.selected{
                        color:#333;
                    }
                }
            }
        }
    }
</style>