import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Profile = ({ getProfile }) => {
  const [userProfile, setProfile] = useState({
    profileData: null,
    error: null
  });

  useEffect(() => {
    getProfile((profileData, err) => {
      setProfile({ profileData: profileData, error: err });
    });
  }, []);

  return (
    <>
      {userProfile.profileData != null ? (
        <>
          <h1>Profile</h1>
          <p>{userProfile.profileData.nickname}</p>
          <img
            style={{ maxWidth: 50, maxHeight: 50 }}
            src={userProfile.profileData.picture}
            alt="profile pic"
          />
          <pre>{JSON.stringify(userProfile, null, 2)}</pre>
        </>
      ) : (
        <div />
      )}
    </>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired
};

export default Profile;
