import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA7hfb-0QE1Gz2QyKbRQBF9U6zb-G_wb8A',
  authDomain: 'exchanger-fc2d7.firebaseapp.com',
  projectId: 'exchanger-fc2d7',
  storageBucket: 'exchanger-fc2d7.appspot.com',
  messagingSenderId: '944878519517',
  appId: '1:944878519517:web:2f6d71ca7e264ebc3e0734',
};

initializeApp(firebaseConfig);
// export const auth = getAuth(initializeApp(firebaseConfig));
export const db = getFirestore();
