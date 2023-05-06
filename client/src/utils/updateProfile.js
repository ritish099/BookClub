import axios from "axios";
import getFromLocalStorage from "./getFromLocalStorage";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const updateProfile = async (data, image, actions, setSuccess, setError) => {
  try {

    const token = getFromLocalStorage("token");
    const id = getFromLocalStorage("id");
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/update-user/${id}`;

    const totalData = {};

    if(data.newName){
      totalData.name = data.newName;
      localStorage.setItem('name', data.newName);
    }
    if(data.about)totalData.about = data.about;
    if(image)totalData.image = await toBase64(image);

    axios
      .post(url, totalData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        actions.setSubmitting(false);
        console.log(res);
        setSuccess({
          success: true,
          message: "Profile has been uploaded successfully",
        });
        actions.resetForm();
        setError({error: false, message: ""});
      })
      .catch((err) => {
        console.log("err", err);
        actions.setSubmitting(false);
        setSuccess({success: false, message: ""});
        if (err.code === "ERR_NETWORK") {
          setError({error: true, message: "network error"});
        } else {
          setError({error: true, message: err.response.data.message});
        }
      });

  } catch (err) {
    actions.setSubmitting(false);
    setError({error: true, message: "Something went wrong. Please try again!"});
  }
};

export default updateProfile;
