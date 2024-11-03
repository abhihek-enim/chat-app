import "./LeftSidebar.css";
import assests from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, logout } from "../../config/firebase";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
const LeftSidebar = () => {
  const navigate = useNavigate();
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    messagesId,
    setMessagesId,
    chatVisible,
    setChatVisible,
  } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const queryOutcome = query(
          userRef,
          where("username", "==", input.toLowerCase())
        );
        const querySnap = await getDocs(queryOutcome);

        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          let userExist = false;

          chatData?.map((user) => {
            if (user.rId === querySnap.docs[0].data().id) {
              userExist = true;
            }
          });

          if (!userExist) {
            console.log(querySnap.docs[0].data());
            setUser(querySnap.docs[0].data());
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addChat = async () => {
    console.log(userData, "sdfafd"); 
    const messageRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
    try {
      const newMessageRef = doc(messageRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });
      console.log("inside try block", userData);
  
      await updateDoc(doc(chatsRef, user.id), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });
      await updateDoc(doc(chatsRef, userData.id), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });
  
      // Rename to avoid shadowing
      const userSnap = await getDoc(doc(db, "users", user.id));
      const retrievedUserData = userSnap.data();
      
      setChat({
        messageId: newMessageRef.id,
        lastMessage: "",
        rId: userData.id,
        updatedAt: Date.now(),
        messageSeen: true,
        userData: retrievedUserData, // Use retrieved data here
      });
      setShowSearch(false);
      setChatVisible(true);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const setChat = async (item) => {
    console.log(item);
    setChatUser(item);
    setMessagesId(item?.messageId);
    const userChatsRef = doc(db, "chats", userData.id);
    const userChatsSnapShot = await getDoc(userChatsRef);
    const userChatData = userChatsSnapShot.data();
    const chatIndex = userChatData.chatData.findIndex(
      (c) => c.messageId === item.messageId
    );
    userChatData.chatData[chatIndex].messageSeen = true;
    await updateDoc(userChatsRef, {
      chatData: userChatData.chatData,
    });
    setChatVisible(true);
  };
  useEffect(() => {
    const updateChatUserData = async () => {
      console.log(userData);
      if (chatUser) {
        const userRef = doc(db, "users", chatUser.userData.id);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        setChatUser((prev) => ({ ...prev, userData: userData }));
      }
    };
    updateChatUserData();
  }, [chatData]);

  return (
    <div className={`ls ${chatVisible ? "hidden" : ""}`}>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assests.logo} className="logo" alt />
          <div className="menu">
            <img src={assests.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assests.search_icon} alt="" />
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Search here..."
          />
        </div>
      </div>
      <div className="ls-list">
        {showSearch && user ? (
          <div onClick={addChat} className="friends add-user">
            <img src={user.avatar} alt="" />
            <div>
              <p>{user.name}</p>
            </div>
          </div>
        ) : (
          chatData?.map((item, index) => (
            <div
              onClick={() => setChat(item)}
              key={index}
              className={`friends ${
                item.messageSeen || item.messageId === messagesId
                  ? " "
                  : "border"
              }`}
            >
              <img src={item?.userData?.avatar} alt="" />
              <div>
                <p>{item?.userData?.name}</p>
                <span>{item?.lastMessage}</span>
              </div>
            </div>
          ))
        )}
        {}
      </div>
    </div>
  );
};

export default LeftSidebar;
