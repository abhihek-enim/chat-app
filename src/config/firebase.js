import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCsChK_zxn2FX2c7ZAC3PxWJNFUteDDY6c",
  authDomain: "chat-app-92798.firebaseapp.com",
  projectId: "chat-app-92798",
  storageBucket: "chat-app-92798.appspot.com",
  messagingSenderId: "334869780680",
  appId: "1:334869780680:web:268c88d12f3d534f602dfd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    //initializing user data
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, I am chatting.....",
      lastSeen: Date.now(),
    });
    //initializing chatdata
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" ").toUpperCase());
  }
};
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" ").toUpperCase());
  }
};
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" ").toUpperCase());
  }
};
const resetPassword = async (email) => {
  if (!email) {
    toast.error("Enter Email");
    return null;
  }
  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset mail is sent.");
    } else {
      toast.error("Email does not exist.");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
export { signUp, login, logout, auth, db, resetPassword };
