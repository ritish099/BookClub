import {
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import '../styles/error.css';

export default function SimpleCard() {
  return (
    <Flex
      minH={"100vh"}
      direction={"column"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white.50", "white.800")}
    >
      <div class="four_zero_four_bg">
        <h1 class="text-center ">404</h1>
      </div>

      
        <div class="contant_box_404">
          <h3 class="h2">Looks like you're lost</h3>

          <p>The page you are looking for is not available!</p>

          <Link to="/" class="link_404">
            Go to Home
          </Link>
        </div>
    </Flex>
  );
}
