import "./ProfileUpdate.css";
import assests from "../../assets/assets";
import { useState } from "react";

const ProfileUpdate = () => {
  const [image, setImage] = useState("");

  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => {
                setImage(e?.target?.files[0]);
              }}
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assests?.avatar_icon}
              alt=""
            />
            Upload Image
          </label>
          <input type="text" placeholder="Your Name" required />
          <textarea placeholder="Write Profile bio" required></textarea>
          <button type="submit">Save </button>
        </form>
        <img
          className="profile-pic"
          src={image ? URL.createObjectURL(image) : assests?.logo_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
