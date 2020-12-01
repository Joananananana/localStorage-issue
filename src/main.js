import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/icon.css'
import '@/assets/global.scss'
import './utils/boost'
import CreateAPI from 'vue-create-api'
//import './mock/index.js'
createApp(App).use(store).use(router).mount('#app')
createApp(App).use(CreateAPI,{
    apiPreFix:'$create-',
    componentPreFix:'cube-'
})
import Toast from '@/components/common/Toast'
createApp(App).createAPI(Toast,true)