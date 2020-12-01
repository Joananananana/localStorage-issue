import {mapActions,mapGetters} from 'vuex'
import { addCss } from './book'
import { saveLocation } from '@/utils/localStorage.js'
import { getBookmark } from './localStorage'
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
            const currentLocation = this.currentBook.rendition.currentLocation()
            if(currentLocation && currentLocation.start){
                const startCfi = currentLocation.start.cfi
                const progress = this.currentBook.locations.percentageFromCfi(startCfi) 
                this.setProgress(Math.floor(progress * 100))
                saveLocation(this.fileName,startCfi)
                const bookmark = getBookmark(this.fileName)
                if(bookmark){
                    if(bookmark.some(item => item.cfi === startCfi)){
                        this.setIsBookmark(true)
                    }else{
                        this.setIsBookmark(false)
                    }
                }else{
                    this.setIsBookmark(false)
                }
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
        },
        hideTitleAndMenu(){
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
    }
   
}
export const storeHomeMixin = {
    computed: {
      ...mapGetters([
        'offsetY',
        'hotSearchOffsetY',
        'flapCardVisible',
        'runFlapCardAnimation'
      ])
    },
    methods: {
      ...mapActions([
        'setOffsetY',
        'setHotSearchOffsetY',
        'setFlapCardVisible',
        'setRunFlapCardAnimation'
      ]),
      showBookDetail(book) {
        this.$router.push({
            path:'/store/flatList',
            query:{
                fileName:book.fileName,
                category:book.categoryText
            }
        })
      }
    }
  }
export const storeShelfMixin = {
    computed: {
      ...mapGetters([
        'isEditMode',
        'shelfList',
        'shelfSelected',
        'shelfTitleVisible',
        'offsetY',
        'shelfCategory',
        'currentType'
      ])
    },
    methods: {
      ...mapActions([
        'setIsEditMode',
        'setShelfList',
        'setShelfSelected',
        'setShelfTitleVisible',
        'setOffsetY',
        'setShelfCategory',
        'setCurrentType'
      ]),
      showBookDetail(book) {
        this.$router.push({
          path:'/store/flatList',
          query:{
              fileName:book.fileName,
              category:book.categoryText
          }
      })
      },
      getCategoryList(title) {
        this.getShelfList().then(() => {
          const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
          this.setShelfCategory(categoryList)
        })
      },
      getShelfList() {
        let shelfList = getBookShelf()
        if (!shelfList) {
          shelf().then(response => {
            if (response.status === 200 && response.data && response.data.bookList) {
              shelfList = appendAddToShelf(response.data.bookList)
              saveBookShelf(shelfList)
              return this.setShelfList(shelfList)
            }
          })
        } else {
          return this.setShelfList(shelfList)
        }
      },
      moveOutOfGroup(f) {
        this.setShelfList(this.shelfList.map(book => {
          if (book.type === 2 && book.itemList) {
            book.itemList = book.itemList.filter(subBook => !subBook.selected)
          }
          return book
        })).then(() => {
          const list = computeId(appendAddToShelf([].concat(
            removeAddFromShelf(this.shelfList), ...this.shelfSelected)))
          this.setShelfList(list).then(() => {
            this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
            if (f) f()
          })
        })
      }
    }
  }
  