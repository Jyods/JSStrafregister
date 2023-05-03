import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CaseView from '../views/CaseView.vue'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import EntryView from '../views/EntryView.vue'
import MemberView from '../views/MemberView.vue'

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
          path: '/entry',
          name: 'Entry',
          component: EntryView,
          props: (route) => ({ EntryID: route.query.EntryID }),
        },
        {
          path: '/member',
          name: 'Member',
          component: MemberView,
          props: (route) => ({ MemberID: route.query.MemberID }),
        },
        {
          path: '/case',
          name: 'Case',
          component: CaseView,
          props: (route) => ({ CaseID: route.query.CaseID }),
          children: [{
            path: '/{CaseID}',
            component: CaseView,
        }]
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
