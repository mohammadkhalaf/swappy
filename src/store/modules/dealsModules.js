import {
  doc,
  Timestamp,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  // getDoc,
  // getDoc,
} from 'firebase/firestore';
import { db } from '@/db';

const datafromDeal = async (deal, id) => {
  if (deal.exchangedFor) {
    const exchangedForDoc = await getDoc(deal.exchangedFor);
    deal.exchangedFor = { ...exchangedForDoc.data(), id: exchangedForDoc.id };
  }
  const toExchangeDoc = await getDoc(deal.toExchange);
  deal.toExchange = { ...toExchangeDoc.data(), id: toExchangeDoc.id };

  const fromUserDoc = await getDoc(deal.fromUser);
  deal.fromUser = { ...fromUserDoc.data(), id: fromUserDoc.id };
  deal.id = id;

  return deal;
};

export default {
  namespaced: true,
  state() {
    return {
      receivedDeals: [],
      sentDeals: [],
    };
  },
  actions: {
    async getDeals({ rootState, commit }) {
      const userId = rootState.user.user.id;

      if (!userId) {
        //do something else
      }

      const dealsQuery = query(
        collection(db, 'deals'),
        where('toUser', '==', doc(db, 'users', userId))
      );
      const dealsSnapshots = await getDocs(dealsQuery);

      const deals = await Promise.all(
        dealsSnapshots.docs.map((d) => datafromDeal(d.data(), d.id))
      );

      console.log(deals);
      commit('setreceivedDeals', deals);
    },
    async getSentDeals({ rootState, commit }) {
      const userId = rootState.user.user.id;

      if (!userId) {
        //do something else
      }

      const dealsQuery = query(
        collection(db, 'deals'),
        where('fromUser', '==', doc(db, 'users', userId))
      );
      const dealsSnapshots = await getDocs(dealsQuery);

      const deals = await Promise.all(
        dealsSnapshots.docs.map((d) => datafromDeal(d.data(), d.id))
      );

      console.log(deals);
      commit('setSentDeals', deals);
    },
    async createDeal(_, payload) {
      console.log(payload);
      const deal = {
        title: payload.title,
        createdAt: Timestamp.fromDate(new Date()),
        toUser: doc(db, 'users', payload.toUser.id),
        fromUser: doc(db, 'users', payload.fromUser.id),
        toExchange: doc(db, 'exchanges', payload.exchangedTo),
        status: 'Pending',
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
    setreceivedDeals(state, payload) {
      state.receivedDeals = payload;
    },
    setSentDeals(state, payload) {
      state.sentDeals = payload;
    },
  },
  getters: {
    getReceivedDeals(state) {
      return state.receivedDeals;
    },
    getSentDeals(state) {
      return state.sentDeals;
    },
  },
};
