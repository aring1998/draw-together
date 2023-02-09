import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index/Index.vue'),
    },
  ],
})

export default router
