// Composables
import axios from 'axios'
import { sessionStore } from '../../store/index'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/layouts/base/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'Main',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/collections',
        name: 'Collections',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Collections.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {

  const { SetUser } = sessionStore()
  axios.get('/api/loggedIn').then((resultado)=>{
    if (to.name !== 'Login' && resultado.data==''){ 
      next({ name: 'Login' })
      SetUser({})
    }else{ 
      if (to.name == 'Login'  && resultado.data) 
        next({ name: 'Home' })
      next()
    }
  })
})

export default router
