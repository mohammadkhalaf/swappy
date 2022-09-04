import { createWebHistory, createRouter } from 'vue-router';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/about', component: AboutPage, name: 'about' },
    { path: '/register', component: RegisterPage, name: 'register' },
  ],
});

export default router;
