import LeftSidebar from "../../components/LeftSideBar/LeftSidebar";
import ChatBox from "../../components/ChatBox/ChatBox";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loader from "../../components/Loader/Loader";

const Chat = () => {
  const { userData, chatData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if ((chatData, userData)) {
      setLoading(false);
    }
  }, [chatData, userData]);
  return (
    <div className="chat">
      {loading ? (
        <Loader/>
      ) : (
        <div className="chat-container">
          <LeftSidebar />
          <ChatBox />
          <RightSideBar />
        </div>
      )}
    </div>
  );
};

export default Chat;
