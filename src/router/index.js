import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    redirect:'/ebook'
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
