import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../api/requests.js'
import HomeView from '../views/HomeView.vue'
import CaseView from '../views/CaseView.vue'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import EntryView from '../views/EntryView.vue'
import MemberView from '../views/MemberView.vue'
import AdminMemberView from '../views/AdminMemberView.vue'
import CreateView from '../views/CreateView.vue'
import CreateEntry from '../components/CreateEntry.vue'
import LawView from '../views/LawView.vue'
import LawArticle from '../views/LawArticle.vue'
import ErrorView from '../views/ErrorView.vue'

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
          name: 'Home',
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
          path: '/adminmember',
          name: 'AdminMember',
          component: AdminMemberView,
        },
        {
          path: '/articles',
          name: 'Law',
          component: LawView,
          children: [
            {
              path: '/{ArticleID}',
              component: LawArticle ,
              props: (route) => ({ ArticleID: route.query.ArticleID }),
            },
            {
              path: '',
              name: 'LawHome',
              component: LawArticle,
            }
          ]
        },
        {
          path: 'create',
          name: 'Create',
          component: CreateView,
          children: [
            {
              path: '',
              name: 'CreateHome',
              component: HomeView
            },
            {
              path: 'entry',
              name: 'CreateEntry',
              component: CreateEntry,
            },
            {
              path: '/member',
              name: 'CreateMember',
              component: MemberView,
            },
            {
              path: '/case',
              name: 'CreateCase',
              component: CaseView,
            },
          ]
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
    //create a new route for the login page but test if the user is already logged in
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorView,
    },
    { 
      path: '/:catchAll(.*)', 
      component: ErrorView,
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  //check if the website isnt error page
  console.log(to.name)
  if (to.name !== 'Error') {
    const isAuthenticated = await auth() // Hier können Sie Ihre eigene Authentifizierungsfunktion implementieren
    if (to.name !== 'Login' && !isAuthenticated) {
      //TODO: Add check if the User is still active
      next({ name: 'Login' })
    } else {
      next()
    }
  }
  else {
    next()
  }
})


export default router
