import { initializeApp } from 'firebase/app';

const config = {
  apiKey: 'YOUR FIREBASE API KEY',
  authDomain: 'YOUR FIREBASE AUTH DOMAIN',
  databaseURL: 'YOUR FIREBASE DATABASE URL',
  projectId: 'YOUR FIREBASE PROJECT ID',
  storageBucket: 'USER FIREBASE STORAGE BUCKET',
  messagingSenderId: 'YOUR FIREBASE MESSAGING SENDER ID',
  appId: 'YOUR FIREBASE APP ID',
};

const app = initializeApp(config);

export default app;
