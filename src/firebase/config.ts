import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: 'AIzaSyC4TPQWPgliVctG0ZggB8-j3jZScBXMXbA',
  authDomain: 'playlist-app-8f085.firebaseapp.com',
  projectId: 'playlist-app-8f085',
  storageBucket: 'playlist-app-8f085.appspot.com',
  messagingSenderId: '544866033834',
  appId: '1:544866033834:web:4644ceff10ed73cf8af0d3'
}

//init firebase
const app = initializeApp(firebaseConfig)

export const db        = getFirestore(app),
             timestamp = serverTimestamp(),
             auth      = getAuth(app),
             storage   = getStorage(app)