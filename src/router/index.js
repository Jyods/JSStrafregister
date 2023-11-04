import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../api/requests.js'
import IndexView from '../views/IndexView.vue'
import StrafregisterView from '../views/Strafregister/StrafregisterView.vue'
import HomeView from '../views/Strafregister/HomeView.vue'
import CaseView from '../views/Strafregister/CaseView.vue'
import MainView from '../views/Strafregister/MainView.vue'
import LoginView from '../views/Strafregister/LoginView.vue'
import EntryView from '../views/Strafregister/EntryView.vue'
import MemberView from '../views/Strafregister/MemberView.vue'
import AdminMemberView from '../views/Strafregister/AdminMemberView.vue'
import CreateView from '../views/Strafregister/CreateView.vue'
import CreateEntry from '../components/strafregister/createEntry.vue'
import LawView from '../views/Strafregister/LawView.vue'
import LawArticle from '../views/Strafregister/LawArticleView.vue'
import ErrorView from '../views/ErrorView.vue'
import Test from '../views/Test.vue'
import PublicCaseView from '../views/Strafregister/PublicCaseView.vue'
import BrodcastView from '../views/Strafregister/BrodcastView.vue'
import ODTView from '../views/Strafregister/ODTView.vue'
import ODTList from '../components/strafregister/ODT/list.vue'
import ODTNew from '../components/strafregister/ODT/new.vue'
import PublicChatView from '../views/Strafregister/PublicChatView.vue'
import LogisticsView from '../views/Logistics/LogisticsView.vue'
import EventleadView from '../views/EventleadView.vue'
import OOCView from '../views/OOC/OOCView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/ooc',
      name: 'OOC',
      component: OOCView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/justice',
      name: 'home',
      component: MainView,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/justice',
          name: 'Home',
          component: HomeView
        },
        {
          path: '/justice/entry',
          name: 'Entry',
          component: EntryView,
          props: (route) => ({ EntryID: route.query.EntryID }),
        },
        {
          path: '/justice/member',
          name: 'Member',
          component: MemberView,
          props: (route) => ({ MemberID: route.query.MemberID }),
        },
        {
          path: '/justice/adminmember',
          name: 'AdminMember',
          component: AdminMemberView,
        },
        {
          path: '/justice/brodcast',
          name: 'Brodcast',
          component: BrodcastView,
        },
        {
          path: '/justice/articles',
          name: 'Law',
          component: LawView,
        },
        {
          path: '/justice/article',
          name: 'LawArticle',
          component: LawArticle ,
          props: (route) => ({ ArticleID: route.query.ArticleID }),
        },
        {
          path: '/justice/chat',
          name: 'Chat',
          component: PublicChatView,
        },
        {
          path: '/justice/odt',
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
              path: ':ODTID',
              name: 'ODTID', 
              component: ODTList,
              props: true,
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
    {
      path: '/logistics',
      name: 'Logistics',
      component: LogisticsView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/eventlead',
      name: 'Eventlead',
      component: EventleadView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/shared/:id',
      name: 'Public',
      component: PublicCaseView,
      meta: {
        requiresAuth: false
      }
    },
    //erstelle einen Error Pfad der den error code als parameter bekommt
    {
      path: '/error/:code',
      name: 'Error',
      component: ErrorView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        requiresAuth: false
      }
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

  console.log(to.name)

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!requiresAuth) {
    console.warn('no auth required')
    next();
    return;
  }

  let isAuthenticated = false;
  try {
    isAuthenticated = await auth();
  } catch (e) {
    console.error(e);
    next({ name: 'Error', params: { code: 500 } })
  }
  
  if (!isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})


export default router
