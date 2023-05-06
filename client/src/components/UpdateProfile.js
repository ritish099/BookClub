import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
  FormErrorMessage,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";

import {useState, useEffect} from "react";
import {Field, Form, Formik} from "formik";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import verifySignIn from "../utils/verifySignIn";
import InfoPage from "./InfoPage";
import ChatButton from "./IconButton";
import updateProfile from "../utils/updateProfile";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const [uploadSuccess, setuploadSuccess] = useState({
    success: false,
    message: "",
  });
  const [uploadError, setuploadError] = useState({error: false, message: ""});
  const [profileImage, setProfileImage] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    verifySignIn().then((res) => {
      //console.log(res);
      setisLoggedIn(res);
    });
  }, []);

  const val1 = useColorModeValue("gray.50", "gray.800");
  const val2 = useColorModeValue("white", "gray.700");

  const handleImageChange = async (e) => {
    await setProfileImage(e.target.files[0]);
  };

  if (uploadSuccess.success) {
    toast({
      title: "Profile updated successfully",
      status: "success",
      position: "bottom-left",
      duration: 9000,
      isClosable: true,
    });
  }

  if (uploadError.error) {
    toast({
      title: uploadError.message,
      status: "error",
      position: "bottom-left",
      duration: 9000,
      isClosable: true,
    });
  }

  return isLoggedIn ? (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={val1}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Update your profile
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {/* to enjoy all of our cool features ✌️ */}
          </Text>
        </Stack>

        <Box
          w={["90vw", "80vw", "60vw", "40vw", "30vw"]}
          alignSelf={"center"}
          rounded={"lg"}
          bg={val2}
          boxShadow={"lg"}
          //p={50}
          padding={30}
        >
          <Formik
            initialValues={{
              ownerName: getFromLocalStorage("name"),
              newName: "",
              about: ""
            }}
            onSubmit={async (values, actions) => {
              await updateProfile(
                values,
                profileImage,
                actions,
                setuploadSuccess,
                setuploadError
              );

              setTimeout(() => {
                navigate('/profile');
              }, 1000);
            }}
          >
            {(props) => (
              <Form autoComplete="false">
                <Stack py={3} px={6}>
                  <Field name="newName">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.newName}>
                        <FormLabel>Update Name</FormLabel>
                        <Input {...field} placeholder="Enter new Name" />
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="about">
                    {({field, form}) => (
                      <FormControl>
                        <FormLabel>Update About</FormLabel>
                        <Textarea {...field} placeholder="Enter something About you" />
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <FormControl>
                    <FormLabel>Upload new Profile Image</FormLabel>
                    <input
                      onInput={(e) => handleImageChange(e)}
                      type="file"
                      name="img"
                      accept="image/*"
                    />
                  </FormControl>
                </Stack>

                <Stack align={"center"}>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Update Profile
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
      <ChatButton />
    </Flex>
  ) : (
    <>
      <InfoPage message="You have to be logged in to access this page" />
      <ChatButton />
    </>
  );
}
