import { initializeApp } from 'firebase/app';

const config = {
  apiKey: 'YOUR API KEY',
  authDomain: 'YOUR AUTH DOMAIN',
  databaseURL: 'YOUR DATABASE URL',
  projectId: 'YOUR PROJECT ID',
  storageBucket: 'USER STORAGE BUCKET',
  messagingSenderId: 'YOUR MESSAGING SENDER ID',
  appId: 'YOUR',
};

const app = initializeApp(config);

export default app;
