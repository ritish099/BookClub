import {useNavigate} from "react-router-dom";
import "../styles/PaymentSuccess.css";
import {Flex, Button} from "@chakra-ui/react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <section class="login-main-wrapper">
      <div class="main-container">
        <div class="login-process">
          <div class="login-main-container">
            <div class="thankyou-wrapper">
              <Flex justify={"center"} align={"center"}>
                <h1>
                  <img
                    src="http://montco.happeningmag.com/wp-content/uploads/2014/11/thankyou.png"
                    alt="thanks"
                  />
                </h1>
              </Flex>
              <p>for shopping with us 🥰</p>

              <Flex justify={"center"} align={"center"}>
                <Button
                  mt={4}
                  colorScheme="teal"
                  fontSize={"30px"}
                  padding={"30px"}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to Home
                </Button>
              </Flex>
              <div class="clr"></div>
            </div>
            <div class="clr"></div>
          </div>
        </div>
        <div class="clr"></div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
