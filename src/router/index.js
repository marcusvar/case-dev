import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop',
    name: 'ShoppingCart',
    component: () => import("../views/ShoppingCart.vue")
  },
  ,
  {
    path: '/success',
    name: 'ThankYouPage',
    component: () => import("../views/ThankYouPage.vue")
  }]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
