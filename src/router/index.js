import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Gallery from '../pages/galeria.vue';
import Favorites from '../pages/Favoritos.vue';
import Login from '../pages/Login.vue';
import SignUp from '../pages/SignUp.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/galeria', name: 'gallery', component: Gallery },
  { path: '/favoritos', name: 'favorites', component: Favorites },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: SignUp },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});


