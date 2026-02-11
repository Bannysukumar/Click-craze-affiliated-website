import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyCXqtDxZKfADKc-3tUVgWgximmXENz0cBs",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "affflicated.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "affflicated",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "affflicated.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "738946629820",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:738946629820:web:ade43bc8881e687c0450b9",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-JL86FKRZR5",
}

const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : (getApps()[0] as FirebaseApp)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app

// Analytics is client-only; init in a client component or when window is defined
export function getAnalyticsSafe() {
  if (typeof window === "undefined") return null
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getAnalytics } = require("firebase/analytics")
  return getAnalytics(app)
}
