import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/db';

export default {
  namespaced: true,
  state() {
    return {
      user: null,
      error: null,
    };
  },
  mutations: {
    setError(state, error) {
      console.log('from mutaion' + error);
      state.error = error;
    },
    removeAlert(state) {
      state.error = null;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    updatedProfile(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    onauthchangeHandler({ dispatch }, cb) {
      onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          await dispatch('getUserProfile', user);
          cb(user);
        } else {
          console.log('no user');
          cb();
        }
      });
    },
    async getUserProfile({ commit }, user) {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      const userProfile = docSnap.data();
      commit('setUser', userProfile);
    },
    async register({ commit, dispatch }, payload) {
      const { email, password, name } = payload;
      try {
        const auth = getAuth();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        user.displayName = name;
        user.exchanges = [];
        dispatch('createUserProfile', user);
        return user;
      } catch (error) {
        commit('setError', error.message);
        dispatch('remvoeAlert');
      }
    },
    async loginHandler({ commit, dispatch }, data) {
      const { email, password } = data;

      try {
        const { user } = await signInWithEmailAndPassword(
          getAuth(),
          email,
          password
        );

        return user;
      } catch (error) {
        commit('setError', error.message);
        dispatch('remvoeAlert');
      }
    },
    async createUserProfile(_, user) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        exchanges: user.exchanges,
        email: user.email,
        id: user.uid,
        credit: 0,
      });
    },
    async remvoeAlert({ commit }) {
      setTimeout(() => {
        commit('removeAlert');
      }, 3000);
    },
    async logOutHandler({ commit }) {
      try {
        await signOut(getAuth());
        commit('setUser', null);
      } catch (error) {
        console.log(error);
      }
    },
    async updateUserProfile({ commit }, payload) {
      console.log(payload);
      const userRef = doc(db, 'users', payload.id);

      await updateDoc(userRef, payload);
      commit('updatedProfile', payload);

    },
  },
  getters: {
    getErorrMsg(state) {
      return state.error;
    },
    isAuth(state) {
      return !!state.user;
    },
    getUser(state) {
      return state.user;
    },
  },
};
