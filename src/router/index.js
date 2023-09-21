// Composables
import axios from 'axios'
import { sessionStore } from '../../store/index'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/',
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
      {
        path: '/chat',
        name: 'Chat',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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
  const { SetUser } = sessionStore()
  axios.get('/api/loggedIn').then((resultado)=>{
    console.log(resultado.data)
    //Logged IN
    if (to.name !== 'Login' && resultado.data==''){ 
      next({ name: 'Login' })
      SetUser({})
    }else  if (to.name == 'Login'  && resultado.data){ 
      next({ name: 'Home' })
    //Chat allowed
    }
    next()
  })
})

export default router
