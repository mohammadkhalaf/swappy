import { createStore } from 'vuex';

import exchanges from './modules/exchangeMoudle';
import user from './modules/userModule';

const store = createStore({
  modules: {
    exchanges,
    user,
  },
});
export default store;
