import Footer from "./Footer";
import Products from "./Products";
import Navbar from "./Navbar";
import SidebarWithHeader from "./Sidebar";

const Home = () => {
  return (
    <>
      <SidebarWithHeader children={<Products/>}/>
    </>
  );
};

export default Home;
