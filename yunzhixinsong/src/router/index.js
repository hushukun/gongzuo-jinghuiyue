import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import OneX from '../views/one-x.vue'
import Product from '../views/product.vue'
import System from '../views/system.vue'
import Cooperation from '../views/cooperation.vue'
import Education from '../views/education.vue'
import Partner from '../views/partner.vue'
import Aboutus from '../views/about-us.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/onex',
    name: 'OneX',
    component: OneX
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/system',
    name: 'System',
    component: System
  },
  {
    path: '/cooperation',
    name: 'Cooperation',
    component: Cooperation
  },
  {
    path: '/education',
    name: 'Education',
    component: Education
  },
  {
    path: '/partner',
    name: 'Partner',
    component: Partner
  },
  {
    path: '/about-us',
    name: 'Aboutus',
    component: Aboutus
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
