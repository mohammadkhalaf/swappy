import { createStore } from 'vuex';

import exchanges from './modules/exchangeMoudle';
import user from './modules/userModule';
import deals from './modules/dealsModules';

const store = createStore({
  modules: {
    exchanges,
    user,
    deals,
  },
});
export default store;
