import { createApp } from 'vue';
import router from './router';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
const app = createApp(App);
// library.add(faUserSecret);
// app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);

app.mount('#app');
