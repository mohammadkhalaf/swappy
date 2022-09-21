import { db } from '../../db/index';
import {
  addDoc,
  // addDoc,
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  where,
  getDoc,

  // where,
} from 'firebase/firestore';
import slugify from 'slugify';

export default {
  namespaced: true,
  state() {
    return {
      exchanges: [],
      exchange: {},
    };
  },
  actions: {
    async getSingleExchange({ commit }, slug) {
      commit('setExchange', {});
      const docQuery = query(
        collection(db, 'exchanges'),
        where('slug', '==', slug)
      );
      const querySnap = await getDocs(docQuery);
      const exchange = querySnap.docs[0].data();
      const userSnap = await (await getDoc(exchange.user)).data();
      exchange.id = querySnap.docs[0].id;

      exchange.user = userSnap;
      console.log(exchange);

      commit('setExchange', exchange);
    },
    async getExchanges(context) {
      const q = query(collectionGroup(db, 'exchanges'));
      const querySnapshot = await getDocs(q);

      const exchanges = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      context.commit('setExchangs', exchanges);
    },
    async createExchanges({ rootState }, data) {
      console.log(data);
      console.log(rootState.user.user.id);
      const userRef = doc(db, 'users', rootState.user.user.id);
      data.user = userRef;
      data.slug = slugify(`${data.title} ${Date.now()}`, {
        lower: true,
        strict: true,
      });
      data.createdAt = new Date().toLocaleDateString();
      await addDoc(collection(db, 'exchanges'), data);
    },
  },
  mutations: {
    setExchangs(state, payload) {
      state.exchanges = payload;
    },
    setExchange(state, payload) {
      state.exchange = payload;
    },
  },
  getters: {
    exchanges(state) {
      return state.exchanges;
    },
    exchange(state) {
      return state.exchange;
    },
    // filteredItems(state, title) {
    //   console.log(state);
    //   console.log(title);
    //   // if (!title) {
    //   //   return state.exchanges;
    //   // }
    //   // const filteredExchanges = state.exchanges.filter((item) => {
    //   //   return (
    //   //     item.title && item.title.toLowerCase().includes(title.toLowerCase())
    //   //   );
    //   // });
    //   // return filteredExchanges;
    // },
  },
};
