import { useState,useEffect } from "react";
import verifySignIn from "../utils/verifySignIn";
import InfoPage from "./InfoPage";

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
    <>User Profile Page</>
  ) : (
    <InfoPage message="You have to be logged in to access this page" />
  );
};

export default Profile;
