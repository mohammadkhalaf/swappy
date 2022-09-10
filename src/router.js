import { createWebHistory, createRouter } from 'vue-router';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import { getAuth } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/about', component: AboutPage, name: 'about' },
    {
      path: '/register',
      component: RegisterPage,
      name: 'register',
      meta: { onlyNonAuth: true },
    },
  ],
});
router.beforeEach((to, _, next) => {
  const user = getAuth().currentUser;
  if (to.meta.onlyNonAuth) {
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
