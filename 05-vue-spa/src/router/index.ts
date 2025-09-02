import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import NotFound404 from '@/modules/common/pages/NotFound404.vue';
import HomePage from '@/modules/landing/pages/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // landing
    {
      path: '/',
      name: 'landing',
      component: () => import('@/modules/landing/layouts/LandingLayout.vue'), // Lazy-loaded
      children: [
        {
          path: '/',
          name: 'home',
          component: HomePage, // Eager-loaded (not lazy, always in the bundle)
        },
        {
          path: '/features',
          name: 'features',
          component: () => import('@/modules/landing/pages/FeaturesPage.vue'), // Lazy-loaded
        },
        {
          path: '/pricing',
          name: 'pricing',
          component: () => import('@/modules/landing/pages/PricingPage.vue'), // Lazy-loaded
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/modules/landing/pages/ContactPage.vue'), // Lazy-loaded
        },
        {
          path: '/pokemon/:id',
          name: 'pokemon',
          beforeEnter: [ isAuthenticatedGuard ], 
          props: ( route ) => {
            const id = Number( route.params.id ); // parseo a number

            return isNaN( id ) ? { id: 1 } : { id }; // si no es un número, devuelvo id: 1
          },
          component: () => import('@/modules/pokemons/pages/PokemonPage.vue'), // Lazy-loaded
        }
      ],
    },

    // auth
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'login' }, // redirect forzado al caer en /auth
      component: () => import('@/modules/auth/layouts/AuthLayout.vue'), // Lazy-loaded
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/modules/auth/pages/LoginPage.vue'), // Lazy-loaded
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/modules/auth/pages/RegisterPage.vue'), // Lazy-loaded
        },
      ],
    },

    // Not found 404
    {
      path: '/:pathMatch(.*)*', // Cualquier ruta que no coincida con las anteriores
      name: 'NotFound',
      component: NotFound404, // Edger-loaded (not lazy, always in the bundle)
    },
  ],
});

export default router;
