import "./RightSideBar.css";
import assests from "../../assets/assets";
const RightSideBar = () => {
  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={assests?.profile_img} alt="" />
        <h3>
          Sammy <img src={assests.green_dot} className="green-dot" alt="" />
        </h3>
        <p>Hello ji..kyaa haaal</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assests.pic1} alt="" />
          <img src={assests.pic3} alt="" />
          <img src={assests.pic2} alt="" />
          <img src={assests.pic4} alt="" />
        </div>
      </div>
      <button>Logout</button>
    </div>
  );
};

export default RightSideBar;
