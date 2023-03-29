import axios from "axios";

const verifyEmail = async (id, token) => {
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/verify-email/${id}/${token}`;
    const res = await axios.get(url);
    return res.data.message;
};

export default verifyEmail;
