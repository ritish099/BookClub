import axios from "axios";

const userSignUp = (data, actions, setSignupSuccess, setSignupError) => {
  const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/signup`;
  console.log(url);
  axios
    .post(url, data)
    .then((res) => {
      console.log("suc", res);
      actions.setSubmitting(false);
      setSignupSuccess({success: true, message: ""});
      setSignupError({error: false, message: ""});
    })
    .catch((err) => {
      console.log("err", err);
      actions.setSubmitting(false);
      setSignupSuccess({ success: false, message: "" });
      if (err.code === "ERR_NETWORK") {
        setSignupError({ error: true, message: "network error" });
      } else {
        setSignupError({ error: true, message: err.response.data.message });
      }
    });
};

export default userSignUp;
