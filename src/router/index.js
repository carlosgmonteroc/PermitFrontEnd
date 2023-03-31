import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'permit',
      component: () => import('../views/PermitView.vue')
    }
  ]
})

export default router
