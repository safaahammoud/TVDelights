import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tv-shows-list',
      component: () => import('@/views/TVShowsList.vue')
    },
    {
      path: '/show/:id',
      name: 'tv-show-details',
      component: () => import('@/views/TVShowsDetails.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: () => import('@/views/PageNotFound.vue')
    }
  ]
});

export default router;
