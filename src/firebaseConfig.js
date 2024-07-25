// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMEsb67Sg4osT79qI7p_BwTCyF2uSThOU",
  authDomain: "expenditure-3794d.firebaseapp.com",
  databaseURL: "https://expenditure-3794d-default-rtdb.firebaseio.com",
  projectId: "expenditure-3794d",
  storageBucket: "expenditure-3794d.appspot.com",
  messagingSenderId: "860243063286",
  appId: "1:860243063286:web:77b25697c8caaea667d7d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };