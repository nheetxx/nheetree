// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from 'firebase/storage'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { INITIAL_USER_DATA } from "@/constants/initial-user";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


export const FirebaseAuth = getAuth();

export const Authentication = () => {
  return FirebaseAuth;
};

export const SignIn = async (email, password) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password)
}

export const GetAuthErrorMessage = (error) => {
  const errorMessages = {
    'auth/operation-not-allowed': 'Login Google belum diaktifkan di Firebase Authentication.',
    'auth/unauthorized-domain': 'Domain aplikasi belum ditambahkan ke daftar Authorized domains Firebase.',
    'auth/popup-blocked': 'Popup login diblokir browser. Izinkan popup lalu coba lagi.',
    'auth/popup-closed-by-user': 'Popup login ditutup sebelum proses selesai.',
    'auth/cancelled-popup-request': 'Permintaan login Google dibatalkan. Coba lagi.',
    'auth/network-request-failed': 'Koneksi bermasalah. Periksa internet lalu coba lagi.',
    'auth/account-exists-with-different-credential': 'Email ini sudah terdaftar dengan metode login lain.',
    'permission-denied': 'Login berhasil, tetapi akses profil Firestore ditolak. Periksa Firestore Rules.',
  }

  return errorMessages[error?.code] || `Login Google gagal (${error?.code || 'unknown-error'}).`
}

export const EnsureUserProfile = async (user) => {
  const db = getFirestore(firebase_app)
  const userRef = doc(db, 'links', user.uid)
  const userSnapshot = await getDoc(userRef)

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data()
    const missingFields = {}

    if (!userData.uid) missingFields.uid = user.uid
    if (!userData.email && user.email) missingFields.email = user.email

    if (Object.keys(missingFields).length > 0) {
      await setDoc(userRef, missingFields, { merge: true })
    }

    return {
      id: userSnapshot.id,
      ...userData,
      ...missingFields,
    }
  }

  const userData = {
    ...INITIAL_USER_DATA,
    profile: {
      ...INITIAL_USER_DATA.profile,
      avatar: user.photoURL || INITIAL_USER_DATA.profile.avatar,
    },
    uid: user.uid,
    email: user.email,
    timestamp: Date.now(),
  }

  await setDoc(userRef, userData, { merge: true })
  return { id: user.uid, ...userData }
}

export const CreateUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
  await EnsureUserProfile(result.user)
}

export const GoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(FirebaseAuth, provider)
  await EnsureUserProfile(result.user)
}



export const SignOut = async () => {
  await signOut(FirebaseAuth);
}
export const storage = getStorage(firebase_app, process.env.NEXT_PUBLIC_FIREBASE_STORAGE_PATH)
export default firebase_app;
