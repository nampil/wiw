import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Country from '../components/Country.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/:name',
    name: 'country',
    component: Country,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
