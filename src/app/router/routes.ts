import { RouteRecordRaw } from 'vue-router';
import { Scopes } from 'src/entities/userScope';

declare module 'vue-router' {
  interface RouteMeta {
    scopes?: Scopes[];
    title?: string;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/layouts/MainLayout.vue'),
    children: [
      {
        name: 'main',
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          scopes: ['IS_LOGGED_IN'],
          redirectTo: { name: 'login' },
          title: 'Главная',
        },
      },
      /*{
        name: 'profile',
        path: 'profile',
        component: () => import('pages/ProfilePage.vue'),
        meta: {
          scopes: ['IS_LOGGED_IN'],
          title: 'Профиль',
        },
      },*/
      {
        name: 'prizeGiveaway',
        path: 'prize-giveaway/:id',
        component: () => import('pages/PrizeGiveawayPage.vue'),
        meta: {
          scopes: ['IS_LOGGED_IN'],
          title: 'Просмотр розыгрыша',
        },
      },
      {
        name: 'printCoupons',
        path: 'prize-giveaway/:id/print-coupons',
        component: () => import('pages/PrintCoupons.vue'),
        meta: {
          scopes: ['IS_LOGGED_IN'],
          title: 'Просмотр розыгрыша',
        },
      },
      {
        name: 'prizeGiveawaySettings',
        path: 'prize-giveaway/:id/settings',
        component: () => import('pages/prizeGiveawaySettings.vue'),
        meta: {
          scopes: ['IS_LOGGED_IN'],
          title: 'Редактирование розыгрыша',
        },
      },
      {
        name: 'conducting',
        path: 'prize-giveaway/:id/conducting',
        component: () => import('pages/ConductingPage.vue'),
        meta: {
          scopes: ['IS_LOGGED_IN'],
          title: 'Проведение розыгрыша',
        },
      },
    ],
  },
  // No Layout Pages
  {
    name: 'couponRegistration',
    path: '/coupon-registration/:id',
    component: () => import('pages/CouponRegistration.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: {
      scopes: ['IS_NOT_LOGGED_IN'],
      redirectTo: { name: 'main' },
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
