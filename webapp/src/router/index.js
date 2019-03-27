import Vue from 'vue';
import Router from 'vue-router';
// import paths from './paths';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    {
        path: '*',
        meta: {
          public: true,
        },
        redirect: {
          path: '/index'
        }
    },
    {
        path: '/',
        meta: { },
        name: 'Root',
        redirect: {
          name: '/index'
        }
      }
  ]
});

export default router;
