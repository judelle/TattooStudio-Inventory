import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('../pages/MainPage.vue')
  },
  {
    path: '/materials',
    name: 'MaterialsPage',
    component: () => import('../pages/MaterialsPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;