import { createApp } from 'vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faBars,
  faTimes,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
library.add(faUserSecret, faTimes, faBars);
let app;
store.dispatch('user/onauthchangeHandler', () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.use(store);

    app.component('font-awesome-icon', FontAwesomeIcon);
    app.mount('#app');
  }
});
