// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDEdmgoFvOGDcG3QyAGOw3M3od0VWwq01E",
  authDomain: "chat-app-1bed4.firebaseapp.com",
  projectId: "chat-app-1bed4",
  storageBucket: "chat-app-1bed4.appspot.com",
  messagingSenderId: "552476464388",
  appId: "1:552476464388:web:cf96a4a030b1b6dd726c51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // setting user data in db, "users" is collection name
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      bio: "Hey, I am using Chatkro",
      lastSeen: Date.now(),
    });
    // setting chat data in db, 'chats' is collection name
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
};

export { signup };
