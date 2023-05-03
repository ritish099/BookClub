import axios from "axios";
import getFromLocalStorage from "./getFromLocalStorage";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const notesUpload = async (data, notesFile, actions, setSuccess, setError) => {
  try {
    if (!notesFile) {
      throw Error("");
    }

    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}notes/add`;
    const token = getFromLocalStorage("token");
    const totalData = {
      ...data,
      file: await toBase64(notesFile),
      fileType: notesFile.type,
    };

    axios
      .post(url, totalData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        actions.setSubmitting(false);
        actions.resetForm();
        console.log(res);
        setSuccess({
          success: true,
          message: "Note has been uploaded successfully",
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
    setError({error: true, message: "Uploading a pdf is mandatory"});
  }
};

export default notesUpload;
