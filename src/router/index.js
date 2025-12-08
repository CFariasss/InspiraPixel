import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Gallery from '../pages/galeria.vue';
import Favorites from '../pages/Favoritos.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/galeria', name: 'gallery', component: Gallery },
  { path: '/favoritos', name: 'favorites', component: Favorites },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});


