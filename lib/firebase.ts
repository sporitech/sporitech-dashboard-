import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCwgjaz5GbdCfbSiX9_nsaJvEeXl0o9pi0",
  authDomain: "sporitech.firebaseapp.com",
  projectId: "sporitech",
  storageBucket: "sporitech.firebasestorage.app",
  messagingSenderId: "595575325042",
  appId: "1:595575325042:web:2c487ab1ded69676cd9deb",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)

export { auth }
