import Footer from "./Footer";
import Products from "./Products";
import Navbar from "./Navbar";
import SidebarWithHeader from "./Sidebar";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const [searchParams,] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const message = searchParams.get('m');
    if(message){
      navigate(`/verify/${message}`);
    }
  }, []);

  return (
    <>
      <SidebarWithHeader children={<Products/>}/>
    </>
  );
};

export default Home;
