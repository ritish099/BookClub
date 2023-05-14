import Footer from "./Footer";
import Products from "./Products";
import verifyEmail from "../utils/verifyEmail";
import SidebarWithHeader from "./Sidebar";
import {useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { useToast } from "@chakra-ui/react";

const Home = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function verifyUserEmail() {
      const message = searchParams.get("m");
      const paymentMessage = searchParams.get("payment");

      if (message) {
        const id = searchParams.get("id");
        const token = searchParams.get("token");
        const res = await verifyEmail(id, token);
        navigate(`/verify/${res}`);
      }

      if (paymentMessage === "payment-success") {
        navigate("/success");
      } else if (paymentMessage === "payment-failure") {
        toast({
          title: "Payment failed! Please try again.",
          status: "error",
          position: "bottom-left",
          duration: 9000,
          isClosable: true,
        });
      }
    }

    verifyUserEmail();
  }, []);

  return (
    <>
      <SidebarWithHeader children={<Products />} />
    </>
  );
};

export default Home;
