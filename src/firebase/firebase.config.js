// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQk45IPpHe17ko1_kl3YJgjcCschsQ3K8",
  authDomain: "ruet-hall-3cb68.firebaseapp.com",
  projectId: "ruet-hall-3cb68",
  storageBucket: "ruet-hall-3cb68.firebasestorage.app",
  messagingSenderId: "1044866451110",
  appId: "1:1044866451110:web:c71d9bb23cb5d553829667"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;