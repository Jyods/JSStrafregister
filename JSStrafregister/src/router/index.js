import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CaseView from '../views/CaseView.vue'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
      children: [
        {
          path: '',
          component: HomeView
        },
        {
          path: '/case',
          name: 'Case',
          component: CaseView,
          props: (route) => ({ CaseID: route.query.CaseID }),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ]
})

export default router
