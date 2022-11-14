import axios from "axios";
import saveToLocalStorage from "./saveToLocalStorage";

const userSignIn = (data, actions, setSignInSuccess, setSignInError, navigate) => {
  const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/login`;
  console.log(url);
  axios
    .post(url, data)
    .then((res) => {
      console.log("suc", res.data.data.token);
      console.log('Successfully signed in')
      actions.setSubmitting(false);
      setSignInSuccess({success: true, message: ""});
      setSignInError({error: false, message: ""});
      saveToLocalStorage(res.data.data.token);
      navigate("/profile")
    })
    .catch((err) => {
      console.log("err", err);
      actions.setSubmitting(false);
      setSignInSuccess({success: false, message: ""});
      setSignInError({error: true, message: err.response.data.message});
    });
};

export default userSignIn;
