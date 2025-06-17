"use client"

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb9z2KAA1udbogIau3wvqd1hIzGLPbe2Q",
  authDomain: "ramnagar-1ebdb.firebaseapp.com",
  projectId: "ramnagar-1ebdb",
  storageBucket: "ramnagar-1ebdb.firebasestorage.app",
  messagingSenderId: "970720622122",
  appId: "1:970720622122:web:b278dd9cc900f8c86d7553",
  measurementId: "G-V7Z1NYPH99",
}

// Initialize Firebase only on client side
let app: FirebaseApp
let auth: Auth
let db: Firestore

if (typeof window !== "undefined") {
  // Initialize Firebase only if it hasn't been initialized already
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }

  // Initialize Firebase services
  auth = getAuth(app)
  db = getFirestore(app)
}

export { auth, db }
export default app
