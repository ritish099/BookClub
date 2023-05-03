import { useState,useEffect } from "react";
import verifySignIn from "../utils/verifySignIn";
import InfoPage from "./InfoPage";
import SocialProfileSimple from "./ProfileData";
import ProductCard from '../components/ProductCard';
import getUserBooks from "../utils/getUserBooks";
import { Text } from "@chakra-ui/react";
import ChatButton from "./IconButton";

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
      <div className="Heading">
        <Text marginBottom={"10px"}>Your Books</Text>
      </div>
      <div className="Catalogue">
        {Books.map((book) => (
          <ProductCard id={book._id} book={book} />
        ))}
      </div>

      <ChatButton />
    </div>
  ) : (
    <>
      <InfoPage message="You have to be logged in to access this page" />
      <ChatButton/>
    </>
  );
};

export default Profile;
