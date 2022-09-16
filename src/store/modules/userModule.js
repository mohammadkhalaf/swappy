import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  // query,
  // collection,
  // where,
  // getDocs,
} from 'firebase/firestore';
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
        console.log(user);
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
      const useWithProfile = {
        id: user.uid,
        email: user.email,
        ...userProfile,
      };
      // const q = query(collection(db, 'exchanges'), where('user', '==', id));

      // const querySnap = await getDocs(q);
      // const exchanges = querySnap.docs.map((d) => d.data());

      commit('setUser', useWithProfile);
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        const auth = getAuth();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
        await dispatch('createUserProfile', {
          id: user.uid,
          name,
          exchanges: [],
          credit: 0,
        });

        // user.displayName = name;
        // user.exchanges = [];
        // user.id = user.uid;
        // console.log(user);
        // return user;
      } catch (error) {
        commit('setError', error.message);
        dispatch('remvoeAlert');
      }
    },
    async loginHandler({ commit, dispatch }, data) {
      const { email, password } = data;

      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      } catch (error) {
        commit('setError', error.message);
        dispatch('remvoeAlert');
      }
    },
    async createUserProfile(_, { id, ...profile }) {
      console.log(id, profile);
      await setDoc(doc(db, 'users', id), { id, profile });
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
