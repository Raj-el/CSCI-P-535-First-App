import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBisKE9oJxmbWoE6qECpEZskCpmKoQ8C7A",
  authDomain: "my-app-3ba50.firebaseapp.com",
  projectId: "my-app-3ba50",
  storageBucket: "my-app-3ba50.appspot.com",
  messagingSenderId: "392800303698",
  appId: "1:392800303698:web:38b53979ac2566eb693d8b",
  measurementId: "G-PEX4GDQNPY",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
