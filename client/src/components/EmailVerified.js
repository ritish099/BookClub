import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {Link, useParams} from "react-router-dom";

export default function SignupCard() {
  const {message} = useParams();
  //console.log(message);

  let info;

  switch (message) {
    case "verification link invalid":
      info = {
        message: "Verification link is invalid",
        btnText: "Sign up",
        route: "/signup",
      };
      break;

    case "user not found":
      info = {
        message: "No such user found",
        btnText: "Sign up",
        route: "/signup",
      };
      break;

    case "user has already verified":
      info = {
        message: "User has already been verified",
        btnText: "Sign in",
        route: "/signin",
      };
      break;

    case "your account has been verified":
      info = {
        message: "Thanks! Your account has been successfully verified",
        btnText: "Sign in",
        route: "/signin",
      };
      break;

    default:
      info = {
        message: "Please sign up",
        btnText: "Sign up",
        route: "/signup",
      };
      break;
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack>
        <Box
          alignSelf={"center"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={30}
        >
          <Stack alignSelf={"center"} maxW={"lg"}>
            <Text fontSize="3xl" align={"center"}>
              {info.message}
            </Text>
          </Stack>

          <Stack align={"center"} my={5}>
            <Link to={`${info.route}`}>
              <Button colorScheme="teal" variant="solid">
                {info.btnText}
              </Button>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
