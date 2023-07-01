import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MdEdit } from "react-icons/md";
import Header from "../Header3";
import profileStyle from "../css/profileStyle.module.css";
import Demo from "../../assets/images.jpeg";
// import { getStorage, ref, uploadBytes } from "firebase/storage";
import { uploadImageToFirebase } from "../../firebaseUtils";
import useFetch from "../../hooks/useFetch";

const Profile = () => {
  const { currentUser } = useAuth();
  const profileUrl = useFetch(`users/${currentUser.uid}/profile-picture`);
  const logo = profileUrl || Demo;
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageUploader, setShowImageUploader] = useState(false);

  const handleEditClick = () => {
    fileInputRef.current.click();
    setShowImageUploader(true);
  };

  const handleImageUpload = () => {
    uploadImageToFirebase(
      selectedImage,
      `profile-picture/${currentUser.uid}`,
      `users/${currentUser.uid}/profile-picture`
    );

    // disable image upload button
    setShowImageUploader(false);
  };

  return (
    <>
      <Header />
      <div className={profileStyle["profile-container"]}>
        <img
          src={logo}
          alt="Profile Picture"
          className={profileStyle["profile-picture"]}
        />
        <MdEdit onClick={handleEditClick} />
        {showImageUploader && (
          <button onClick={handleImageUpload}>Upload</button>
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <p className={profileStyle["profile-name"]}>
          {currentUser.displayName}
          <MdEdit onClick={handleImageUpload} />
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
