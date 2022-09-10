import { createApp } from 'vue';
import router from './router';
import store from './store';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
let app;
store.dispatch('user/onauthchangeHandler', () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.use(store);

    app.mount('#app');
  }
});

// library.add(faUserSecret);
// app.component('font-awesome-icon', FontAwesomeIcon);
