import axios from "axios";
//import resetPasswordText from "../../../server/src/lib/resetPasswordText";
import getFromLocalStorage from "./getFromLocalStorage";
const getUserDetails = (setUserDetails) => {
    const token=getFromLocalStorage('token');
    const url=`${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/user-details`;
    console.log(url);
    axios.get(url,{
        headers:{
            authorization:`Bearer ${token}`
        }
    }).then(res=>{
        setUserDetails(res.data)
        console.log(res.data)
    }).catch(err=>console.log(err))
}
export default getUserDetails;