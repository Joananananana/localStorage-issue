import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    redirect:'/store'
  },
  {
    path:'/ebook',
    component:() => import('@/views/ebook/index.vue'),
    children:[
      {
        path:':fileName',
        component:() => import('@/components/ebook/ebookReader.vue')
      }
    ]
  },
  {
    path:'/store',
    component:() => import('@/views/store/index.vue'),
    redirect:'/store/shelf',
    children:[
      {
        path:'/shelf',
        component:() => import('@/views/store/storeShelf.vue')
      },
      {
        path:'home',
        component:() => import('@/views/store/storeHome.vue')
      },
      {
        path:'list',
        component:() => import('@/views/store/StoreList.vue')
      },
      {
        path:'detail',
        component:() => import('@/views/store/StoreDetail.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
