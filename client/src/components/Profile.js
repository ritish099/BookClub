import { useState,useEffect } from "react";
import verifySignIn from "../utils/verifySignIn";
import InfoPage from "./InfoPage";
import SocialProfileSimple from "./ProfileData";
import ProductCard from '../components/ProductCard';
import getUserBooks from "../utils/getUserBooks";

const Profile = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    verifySignIn().then((res) =>{
        //console.log(res);
        setisLoggedIn(res);
    })
    getUserBooks(setBooks);
  },[]);


  return isLoggedIn ? (
    <div>
      <SocialProfileSimple />
      <div className="Catalogue">
        {Books.map((book) => (
          <ProductCard id={book._id} book={book} />
        ))}
      </div>
    </div>
  ) : (
    <InfoPage message="You have to be logged in to access this page" />
  );
};

export default Profile;
