import axios from "axios";
import getFromLocalStorage from "./getFromLocalStorage";

const getUserBooks = (setBooks) => {
  const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}book/user-books`;
  console.log(url);
  const token = getFromLocalStorage('token');
  axios
    .get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      //setBooks(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getUserBooks;
