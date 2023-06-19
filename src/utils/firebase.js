import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdIvfvkTDXXhbAYIxfABUaMpeTnOxGFQU",
  authDomain: "e-commerce-7bf36.firebaseapp.com",
  projectId: "e-commerce-7bf36",
  storageBucket: "e-commerce-7bf36.appspot.com",
  messagingSenderId: "783164815413",
  appId: "1:783164815413:web:163b0761182fe53fe3597c",
  measurementId: "G-ZWLXXN714T",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const checkUserExists = async (email) => {
  let rawData = [];
  let id = "";

  const q = query(collection(db, "userData"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    rawData.push(doc.data());
    id = doc.id;
  });
  let data = rawData[0];
  return data;
};

export { db };
