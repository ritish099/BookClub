import getFromLocalStorage from "./getFromLocalStorage";
import axios from "axios";

const verifySignIn = async () => {
  const token = getFromLocalStorage('token');
  if (!token) {
    return false;
  }

  const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/verify-signin`;
  const data = {token: token};

  try {
    const res = await axios.post(url, data);
    const message = res.data.message;
    console.log(message);
    if (message === "User found") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export default verifySignIn;
