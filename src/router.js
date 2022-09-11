import { createWebHistory, createRouter } from 'vue-router';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreateExchange from './pages/CreateExchange';
import { getAuth } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/about', component: AboutPage, name: 'about' },
    {
      path: '/create',
      component: CreateExchange,
      name: 'create',
      meta: { onlyAuth: true },
    },
    {
      path: '/profile',
      component: ProfilePage,
      name: 'about',
      meta: { onlyAuth: true },
    },
    {
      path: '/register',
      component: RegisterPage,
      name: 'Register',
      meta: { onlyNonAuth: true },
    },
  ],
});
router.beforeEach((to, _, next) => {
  const user = !!getAuth().currentUser;
  if (to.meta.onlyAuth) {
    if (user) {
      next();
    } else {
      next({ name: 'Register' });
    }
  } else if (to.meta.onlyNonAuth) {
    if (user) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
