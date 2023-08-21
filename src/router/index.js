import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../api/requests.js'
import HomeView from '../views/SHomeView.vue'
import CaseView from '../views/SCaseView.vue'
import MainView from '../views/SMainView.vue'
import LoginView from '../views/SLoginView.vue'
import EntryView from '../views/SEntryView.vue'
import MemberView from '../views/SMemberView.vue'
import AdminMemberView from '../views/SAdminMemberView.vue'
import CreateView from '../views/SCreateView.vue'
import CreateEntry from '../components/SCreateEntry.vue'
import LawView from '../views/SLawView.vue'
import LawArticle from '../views/SLawArticleView.vue'
import ErrorView from '../views/ErrorView.vue'
import Test from '../views/Test.vue'
import PublicCaseView from '../views/SPublicCaseView.vue'
import BrodcastView from '../views/SBrodcastView.vue'
import ODTView from '../views/SODTView.vue'
import ODTList from '../components/SODTList.vue'
import ODTNew from '../components/SODTNew.vue'
import PublicChatView from '../views/SPublicChatView.vue'

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
          path: '/brodcast',
          name: 'Brodcast',
          component: BrodcastView,
        },
        {
          path: '/articles',
          name: 'Law',
          component: LawView,
        },
        {
          path: '/article',
          name: 'LawArticle',
          component: LawArticle ,
          props: (route) => ({ ArticleID: route.query.ArticleID }),
        },
        {
          path: '/chat',
          name: 'Chat',
          component: PublicChatView,
        },
        {
          path: '/odt',
          name: 'ODT',
          component: ODTView,
          children: [
            {
              path: '',
              name: 'ODTHome',
              component: ODTList,
            },
            {
              path: 'new',
              name: 'ODTNew',
              component: ODTNew,
            },
            {
              path: '{ODTID}',
              name: 'ODTID', 
              component: ODTList,
              props: (route) => ({ ODTID: route.query.ODTID }),
            },
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
      path: '/shared/:id',
      name: 'Public',
      component: PublicCaseView,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorView,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    { 
      path: '/:catchAll(.*)', 
      component: ErrorView,
      name: 'PathNotFound',
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  //check if the website isnt error page
  console.log(to.path)
  /*if (to.path.startsWith('/shared/')) {
    next()
  }*/
  if (to.name !== 'Error' && to.name !== 'Test' && to.name !== 'PathNotFound') {
    const isAuthenticated = await auth() // Hier können Sie Ihre eigene Authentifizierungsfunktion implementieren
    
    if (to.path.startsWith('/shared/') || to.path.startsWith('/error')) {
      next()
    }
    
    if (to.name !== 'Login' && !isAuthenticated) {
      //TODO: Add check if the User is still active
      next({ name: 'Login' })
    } else {
      console.log(to.path.startsWith('/shared/'))
      next()
    }
  }
  else {
    console.log('error page')
    next()
  }
})


export default router
