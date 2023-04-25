import axios from "axios";
import getFromLocalStorage from "./getFromLocalStorage";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const bookUpload = async (data, image, actions, setSuccess, setError) => {
  try {
    if (!image) {
      throw Error("");
    }
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}book/add`;
    const token = getFromLocalStorage("token");
    const totalData = {
      ...data,
      image: await toBase64(image),
      imageType: image.type,
    };

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
          message: "Book has been uploaded successfully",
        });
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
    setError({error: true, message: "Uploading an image is mandatory"});
  }
};

export default bookUpload;

export default bookUpload;