import { useState,useEffect } from "react";
import verifySignIn from "../utils/verifySignIn";
import InfoPage from "./InfoPage";
import SocialProfileSimple from "./ProfileData";
const Profile = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    verifySignIn().then((res) =>{
        //console.log(res);
        setisLoggedIn(res);
    }
    )
  },[]);

  return isLoggedIn ? (
    <SocialProfileSimple />
  ) : (
    <InfoPage message="You have to be logged in to access this page" />
  );
};

export default Profile;
