import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Replace these values with your Firebase Web App configuration.
const firebaseConfig = {
  apiKey: "AIzaSyApOF6XZuJje8bUKfcI_ZqdnIqpnzUivCk",
  authDomain: "lab4-ionic-vue-cabral.firebaseapp.com",
  projectId: "lab4-ionic-vue-cabral",
  storageBucket: "lab4-ionic-vue-cabral.firebasestorage.app",
  messagingSenderId: "285720496980",
  appId: "1:285720496980:web:005b3f6628a570b0b896c1"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
