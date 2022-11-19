import axios from "axios";
import saveToLocalStorage from "./saveToLocalStorage";

const userSignIn = (data, actions, setSignInSuccess, setSignInError, navigate) => {
  const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/login`;
  console.log(url);
  axios
    .post(url, data)
    .then((res) => {
      //console.log("suc", res.data.data.profile);
      //console.log('Successfully signed in')
      actions.setSubmitting(false);
      setSignInSuccess({success: true, message: ""});
      setSignInError({error: false, message: ""});
      saveToLocalStorage(res.data.data.profile.name, res.data.data.token);
      navigate("/profile")
    })
    .catch((err) => {
      console.log("err", err);
      actions.setSubmitting(false);
      setSignInSuccess({success: false, message: ""});

      if (err.code === "ERR_NETWORK") {
        setSignInError({error: true, message: "network error"});
      } else {
        setSignInError({error: true, message: err.response.data.message});
      }
    });
};

export default userSignIn;
