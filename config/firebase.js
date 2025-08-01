const {initializeApp}= require('firebase/app');
const {getDatabase} = require('firebase/database');

const dotenv = require('dotenv')
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "rest-api-firebase-6e308.firebaseapp.com",
  databaseURL: "https://rest-api-firebase-6e308-default-rtdb.firebaseio.com",
  projectId: "rest-api-firebase-6e308",
  storageBucket: "rest-api-firebase-6e308.firebasestorage.app",
  messagingSenderId: "200819247373",
  appId: "1:200819247373:web:1311cc66d714b985bb4844"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

module.exports = db;