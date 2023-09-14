import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/userContext";
import TedDetails from "./TedDetails";

function Profile() {
  const [userTedArray, setUserTedArray] = useState([]);

  const { userAxios } = useContext(UserContext);

  useEffect(() => {
    userAxios
      .get("/api/main/ted/userTedWithComments")
      .then((res) => setUserTedArray(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(userTedArray);
  const newElements = userTedArray.map((ted) => {
    return <TedDetails {...ted} />;
  });

  return (
    <div id="profile-wrapper">
      <div id="profile-header">
        <h1>Welcome User</h1>
        <img className="profilePic" />
      </div>
      <div>{newElements}</div>
    </div>
  );
}

export default Profile;
