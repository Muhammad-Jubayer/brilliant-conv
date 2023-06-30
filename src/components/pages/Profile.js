import { useAuth } from "../../contexts/AuthContext";
import Header from "../Header3";
import profileStyle from "../css/profileStyle.module.css";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images.jpeg";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className={profileStyle["profile-container"]}>
        <img
          src={logo}
          alt="Profile Picture"
          className={profileStyle["profile-picture"]}
        />
        <MdEdit />
        <p className={profileStyle["profile-name"]}>
          {currentUser.displayName}
          <MdEdit />
        </p>
        <p className={profileStyle["profile-info"]}>
          <span>UID:</span> {currentUser.uid}
        </p>
        <p className={profileStyle["profile-info"]}>
          <span>Email Address:</span> {currentUser.email}
        </p>
      </div>
    </>
  );
};

export default Profile;
