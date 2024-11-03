/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { auth, db } from "../config/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messagesId, setMessagesId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      const userData = userSnap.data();
      console.log(userData);
      setUserData(userData);
      if (userData.avatar && userData.name) {
        navigate("/chat");
      } else {
        navigate("/profile");
      }
      await updateDoc(userRef, {
        lastSeen: Date.now(),
      });
      setInterval(async () => {
        if (auth.chatUser) {
          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userData) {
      console.log(userData);
      const chatRef = doc(db, "chats", userData.id);
      const unsub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data().chatData;

        const tempData = [];
        for (const item of chatItems) {
          const userRef = doc(db, "users", item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          tempData.push({ ...item, userData });
        }
        // console.log(tempData);
        setChatData(
          tempData?.sort((a, b) => {
            b?.updatedAt - a?.updatedAt;
          })
        );
      });
      return () => {
        unsub();
      };
    }
    console.log(userData);
  }, [userData]);
  // Functions to show and hide the loader
  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);
  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    showLoader,
    hideLoader,
    loadUserData,
    messagesId,
    setMessagesId,
    messages,
    setMessages,
    chatUser,
    setChatUser,
    chatVisible,
    setChatVisible,
  };
  return (
    <AppContext.Provider value={value}>
      {loading && <Loader />}
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
