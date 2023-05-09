import Footer from "./Footer";
import Products from "./Products";
import verifyEmail from "../utils/verifyEmail";
import SidebarWithHeader from "./Sidebar";
import {useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Home = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyUserEmail() {
      const message = searchParams.get("m");
      if (message) {
        const id = searchParams.get("id");
        const token = searchParams.get("token");
        const res = await verifyEmail(id, token);
        navigate(`/verify/${res}`);
      }
    }

    verifyUserEmail();
  }, []);

  return (
    <>
      <SidebarWithHeader children={<Products />} />
      <Footer></Footer>
    </>
  );
};

export default Home;
