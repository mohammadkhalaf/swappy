import { doc, Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '@/db';

export default {
  namespaced: true,
  state() {
    return {
      deals: [],
      deal: {},
    };
  },
  actions: {
    async createDeal(_, payload) {
      console.log(payload);
      const deal = {
        title: payload.title,
        createdAt: Timestamp.fromDate(new Date()),
        toUser: doc(db, 'users', payload.toUser.id),
        fromUser: doc(db, 'users', payload.fromUser.id),
        toExchange: doc(db, 'exchanges', payload.exchangedTo),
      };
      if (payload.exchangedFor) {
        deal.exchangedFor = doc(db, 'exchanges', payload.exchangedFor.id);
      } else {
        deal.price = payload.price;
      }
      await addDoc(collection(db, 'deals'), deal);
    },
  },
  mutations: {
    setDeals(state, payload) {
      console.log(payload);
    },
  },
  getters: {
    getDeals(state) {
      console.log(state);
    },
  },
};
