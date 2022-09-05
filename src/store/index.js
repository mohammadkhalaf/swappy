import { createStore } from 'vuex';

// const exchanges = [
//   {
//     id: 1,
//     type: 'product',
//     title: 'iphone 8',
//     price: '200$',
//     user: 'mohammad',
//     image:
//       'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-8/iphone-8-space-gray.jpg',
//     city: 'Stockholm',
//     tags: ['iphone', 'mobile'],
//   },
//   {
//     id: 1,
//     type: 'service',
//     title: 'Gardening',
//     price: '150$',
//     user: 'Ahmad',
//     image:
//       'https://www.popsci.com/uploads/2022/04/21/garden.jpg?auto=webp&width=1440&height=1080',
//     city: 'Oslo',
//     tags: ['gardening', 'Plants'],
//   },
//   {
//     id: 1,
//     type: 'product',
//     title: 'iphone 12',
//     price: '700$',
//     user: 'Rama',
//     image:
//       'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-8/iphone-8-space-gray.jpg',
//     city: 'Stockholm',
//     tags: ['iphone', 'mobile'],
//   },
// ];
import exchanges from './ExchangesModuels/exchangeMoudle';

const store = createStore({
  modules: {
    exchanges,
  },
  //   state() {
  //     return {
  //       exchanges: [],
  //     };
  //   },
  //   actions: {
  //     getExchanges(context) {
  //       setTimeout(() => {
  //         context.commit('setExchangs', exchanges);
  //       }, 1500);
  //     },
  //   },
  //   mutations: {
  //     setExchangs(state, payload) {
  //       return (state.exchanges = payload);
  //     },
  //   },
  //   getters: {
  //     exchanges(state) {
  //       return state.exchanges;
  //     },
  //   },
});
export default store;
