import axios from "axios";
import getFromLocalStorage from "./getFromLocalStorage";
const addBookToCart = async (id, toast) => {
  try {
    const userId = localStorage.getItem("id");
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/addCart/${userId}`;
    const token = getFromLocalStorage("token");
    const totalData = {
      bookId: id,
    };
    axios
      .post(url, totalData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast({
          title: "Book added to cart successfully",
          status: "success",
          position: "bottom-left",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log("err", err);
        toast({
          title: "Something went wrong",
          status: "error",
          position: "bottom-left",
          duration: 9000,
          isClosable: true,
        });
      });
    console.log(id);
  } catch (err) {
    console.log(err);
  }
};

export default addBookToCart;
