import {mapActions,mapGetters} from 'vuex'
import { addCss } from './book'
import { saveLocation } from '@/utils/localStorage.js'
export const ebookMixin = {
    computed:{
        ...mapGetters(['fileName',
        'menuVisible',
        'settingVisible',
        'defaultFontSize',
        'defaultFontFamily',
        'fontFamilyVisible',
        'defaultTheme',
        'bookAvailable',
        'progress',
        'section',
        'isPaginating',
        'currentBook',
        'navigation',
        'cover',
        'metadata',
        'paginate',
        'pagelist',
        'offsetY',
        'isBookmark'])
    },
    methods:{
        ...mapActions(['setFileName',
        'setMenuVisible',
        'setSettingVisible',
        'setDefaultFontSize',
        'setDefaultFontFamily',
        'setFontFamilyVisible',
        'setDefaultTheme',
        'setBookAvailable',
        'setProgress',
        'setSection',
        'setIsPaginating',
        'setCurrentBook',
        'setNavigation',
        'setCover',
        'setMetadata',
        'setPaginate',
        'setPagelist',
        'setOffsetY',
        'setIsBookmark']),
        initGlobalStyle(){
            switch (this.defaultTheme){
                case '默认':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break
                case '护眼':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
                    break
                case '夜间':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
                    break
                default:
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break
            }     
        },
        refreshLocation(){
            const sectionInfo = this.currentBook.section(this.section)
            if(sectionInfo && sectionInfo.href){
            this.currentBook.rendition.display(sectionInfo.href).then(() => {
            const currentLocation = this.currentBook.rendition.currentLocation()
            const startCfi = currentLocation.start.cfi
            const progress = this.currentBook.locations.percentageFromCfi(startCfi) 
            this.setProgress(Math.floor(progress * 100))
            saveLocation(this.fileName,startCfi)
                })
             }
        },
        display(target,cb){
            if(target){
                this.currentBook.rendition.display(target).then(()=>{
                    this.refreshLocation()
                    if(cb) cb()
                })
            }else{
                this.currentBook.rendition.display().then(()=>{
                    this.refreshLocation()
                    if(cb) cb()
                })
            }
        }
    }
   
}