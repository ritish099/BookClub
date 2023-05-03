import axios from "axios";

const getAllNotes = async (setAllNotes, setDisplayNotes) => {
  const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}notes/all`;
  axios
    .get(url)
    .then(async (res) => {
      console.log(res.data.data)
      setAllNotes(res.data.data);
      setDisplayNotes(res.data.data);
    })
    .catch((err) => console.log(err));
};

export default getAllNotes;
