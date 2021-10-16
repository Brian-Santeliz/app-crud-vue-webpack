import Vue from 'vue';
import Router from 'vue-router';
import Main from '../views/Main.vue';
import NoEncontrado from '../views/404.vue';
import Login from '../views/Login.vue';
import CrearUsuario from '../views/CrearUsuario.vue';
import ActualizarUsuario from '../views/ActualizarUsuario.vue';
import { protegerRuta } from '../utils/protegerRuta';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/404',
      component: NoEncontrado,
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (window.localStorage.getItem('admin-login')) {
          return next('/');
        } else {
          return next();
        }
      },
    },
    {
      path: '*',
      redirect: '/404',
    },
    {
      path: '/',
      component: Main,
      beforeEnter: protegerRuta,
    },
    {
      path: '/usuario/:id',
      component: ActualizarUsuario,
      beforeEnter: protegerRuta,
    },
    {
      path: '/crear-usuario',
      component: CrearUsuario,
      beforeEnter: protegerRuta,
    },
  ],
});
