// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { sessionStore } from '../../store/index'
import {Logged} from '../middleware/LoggedIn'
import {Role} from '../middleware/Role'
import {Shared} from '../middleware/Shared'
const routes = [
  {
    path: '/login',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/shared',
    name: 'Shared',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Shared.vue'),
    beforeEnter: (to, from, next) => {
      Shared(to.query.id_col).then((authorized)=>{
        if(authorized){
          next()
        }else{
          next({path:'/401'})
        }
      })
    }
  },
  {
    path: '/401',
    name: 'Unauthorized',
    component: () => import(/* webpackChunkName: "home" */ '@/views/401.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/base/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'Main',
        beforeEnter: (to, from, next) => {
          Role().then((admin)=>{
            if(admin){
              next({path: '/homeAdmin'})
            }else{
              next()
            }
          })
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/homeAdmin',
        name: 'MainAdmin',
        beforeEnter: (to, from, next) => {
          Role().then((admin)=>{
            if(admin){
              next()
            }else{
              next({path: '/home'})
            }
          })
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeAdmin.vue'),
      },
      {
        path: '/collections',
        name: 'Collections',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Collections.vue'),
      },
      {
        path: '/chat',
        name: 'Chat',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Chat.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const {SetUser} = sessionStore()
  Logged().then(loggedin=>{
    switch (to.name){
      case 'Shared':
        next()
        break
      case 'Unauthorized':
        next()
        break
      case 'Login':
        if(loggedin){
          next({path:'/home'})
        }else{
          SetUser({})
          next()
        }
        break
      default:
        if(loggedin){
          next()
        }else{
          next({path:'/login'}) 
        }
    }
  })
})

export default router
