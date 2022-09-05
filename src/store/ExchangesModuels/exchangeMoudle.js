import { db } from '../../db/index';
const exchanges = [
  {
    id: 1,
    type: 'product',
    title: 'iphone 8',
    price: '200$',
    user: 'mohammad',
    descrption: 'I want to change my iphone 8 to mac air ',
    image:
      'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-8/iphone-8-space-gray.jpg',
    city: 'Stockholm',
    tags: ['iphone', 'mobile'],
  },
  {
    id: 1,
    type: 'service',
    title: 'Gardening',
    price: '150$',
    descrption: 'I can help you you with your garden ',
    user: 'Ahmad',
    image:
      'https://www.popsci.com/uploads/2022/04/21/garden.jpg?auto=webp&width=1440&height=1080',
    city: 'Oslo',
    tags: ['gardening', 'Plants'],
  },
  {
    id: 1,
    type: 'product',
    title: 'iphone 12',
    price: '700$',
    descrption: 'I want to change my iphone 12 to iphone pro 13 or mac pro ',
    user: 'Rama',
    image:
      'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-8/iphone-8-space-gray.jpg',
    city: 'Stockholm',
    tags: ['iphone', 'mobile'],
  },
];

export default {
  namespaced: true,
  state() {
    return {
      exchanges: [],
    };
  },
  actions: {
    getExchanges(context) {
      console.log(db);
      context.commit('setExchangs', exchanges);
    },
  },
  mutations: {
    setExchangs(state, payload) {
      state.exchanges = payload;
    },
  },
  getters: {
    exchanges(state) {
      return state.exchanges;
    },
  },
};
