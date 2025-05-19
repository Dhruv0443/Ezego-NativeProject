// firebase.js
import { initializeApp} from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCiCztzx5DRzsGGq1EF27ZCetwvIxwzo9s",
  authDomain: "ezego-carpool.firebaseapp.com",
  databaseURL: "https://ezego-carpool-default-rtdb.firebaseio.com",
  projectId: "ezego-carpool",
  storageBucket: "ezego-carpool.firebasestorage.app",
  messagingSenderId: "278414825260",
  appId: "1:278414825260:web:e4872fa2a1e563e31e7e89"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
