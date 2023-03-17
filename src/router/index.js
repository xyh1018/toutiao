import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => { return import('@/views/layout/LayoutView.vue') },
    children: [
      {
        path: '',
        name: 'home',
        component: () => { return import('@/views/home/HomeView.vue') }
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => { return import('@/views/qa/QaView.vue') }
      },
      {
        path: 'video',
        name: 'video',
        component: () => { return import('@/views/video/VideoView.vue') }
      },
      {
        path: 'person',
        name: 'person',
        component: () => { return import('@/views/person/PersonView.vue') }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => { return import('@/views/login/LoginView.vue') }
  },
  {
    path: '/search',
    name: 'search',
    component: () => { return import('@/views/search/SearchView.vue') }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => { return import('@/views/article/ArticleView.vue') },
    props: true // 开启Props传参
  },
  {
    path: '/person/profile',
    name: 'userprofile',
    component: () => { return import('@/views/user-profile/UserProfile.vue') }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
