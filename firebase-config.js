// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// V1
// const firebaseConfig = {
//   apiKey: "AIzaSyCZXeMJ9tawQbCz03aJwsd94jDqa3Uyysw",
//   authDomain: "hedis-uet.firebaseapp.com",
//   projectId: "hedis-uet",
//   storageBucket: "hedis-uet.appspot.com",
//   messagingSenderId: "344047895792",
//   appId: "1:344047895792:web:c6ffa2913facc1a8612e35"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBqZZaNW-j91ssWRR7JCj0Mz2R6sKGIpPo",
  authDomain: "cloudy-f806d.firebaseapp.com",
  projectId: "cloudy-f806d",
  storageBucket: "cloudy-f806d.firebasestorage.app",
  messagingSenderId: "682613103666",
  appId: "1:682613103666:web:a62d733ed9566c70dcb02b",
  measurementId: "G-VHQYZ0B3GZ"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)