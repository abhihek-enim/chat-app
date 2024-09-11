import assets from "../../assets/assets";
import "./LeftSideBar.css";
const LeftSideBar = () => {
  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p>Edit Profile</p>
              <hr />
              <p>Logout</p>
              
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder="Search here..." />
        </div>
      </div>
      <div className="ls-list">
        <div className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>Sammy</p>
            <span>Radhe Radhe ji...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
