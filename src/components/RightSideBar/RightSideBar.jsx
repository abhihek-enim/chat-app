import { useContext } from "react";
import assets from "../../assets/assets";
import { logout } from "../../config/firebase";
import "./RightSideBar.css";
import { AppContext } from "../../context/AppContext";
const RightSideBar = () => {
  const { showLoader, hideLoader, chatUser, messages } = useContext(AppContext);

  return chatUser ? (
    <div className="rs">
      <div className="rs-profile">
        <img src={chatUser?.userData?.avatar} alt="" />
        <h3>
          {chatUser?.userData?.name}{" "}
          {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
            <img src={assets.green_dot} className="dot" alt="" />
          ) : (
            <p>
              <sub className="offline">Offline</sub>
            </p>
          )}
        </h3>
        <p>{chatUser?.userData?.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          {messages?.map((item, index) =>
            item["image"] ? (
              <img
                key={index}
                onClick={() => window.open(item?.image)}
                src={item?.image}
              />
            ) : null
          )}
          {/* <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" /> */}
        </div>
      </div>
      <button
        onClick={() => {
          showLoader();
          setTimeout(() => {
            logout();
          }, 1000);
          hideLoader();
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="rs">
      <button
        onClick={() => {
          showLoader();
          setTimeout(() => {
            logout();
          }, 1000);
          hideLoader();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default RightSideBar;
