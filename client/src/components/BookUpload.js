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
} from "@chakra-ui/react";

import {useState, useEffect} from "react";
import BookUploadSchema from "../schema/BookUploadSchema";
import {Field, Form, Formik} from "formik";
import bookUpload from "../utils/bookUpload";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import verifySignIn from "../utils/verifySignIn";
import InfoPage from "./InfoPage";
import ChatButton from "./IconButton";
import Loader from "./Loader";

export default function SignupCard() {
  const [uploadSuccess, setuploadSuccess] = useState({
    success: false,
    message: "",
  });
  const [uploadError, setuploadError] = useState({error: false, message: ""});
  const [bookImages, setbookImages] = useState("jj");
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    verifySignIn().then((res) => {
      //console.log(res);
      setisLoggedIn(res);
      setIsLoading(false);
    });
  }, []);

  const val1 = useColorModeValue("gray.50", "gray.800");
  const val2 = useColorModeValue("white", "gray.700");

  const handleImageChange = async (e) => {
    await setbookImages(e.target.files[0]);
  };

  if (uploadSuccess.success) {
    toast({
      title: "Book uploaded successfully",
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

  return isLoading ? (
    <Loader />
  ) : isLoggedIn ? (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={val1}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Upload your book
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
            validationSchema={BookUploadSchema}
            initialValues={{
              ownerName: getFromLocalStorage("name"),
              bookName: "",
              subject: "",
              branch: "",
              author: "",
              noOfPages: "",
              price: "",
              mrp: "",
            }}
            onSubmit={(values, actions) => {
              bookUpload(
                values,
                bookImages,
                actions,
                setuploadSuccess,
                setuploadError
              );
            }}
          >
            {(props) => (
              <Form autoComplete="false">
                <Stack py={3} px={6}>
                  <Field name="bookName">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.bookName} isRequired>
                        <FormLabel>Book Name</FormLabel>
                        <Input {...field} placeholder="Book Name" />

                        {form.errors.bookName ? (
                          <FormErrorMessage w={150}>
                            {form.errors.bookName}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="subject">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.subject} isRequired>
                        <FormLabel>Subject</FormLabel>
                        <Input {...field} placeholder="Subject" />
                        {form.errors.subject ? (
                          <FormErrorMessage w={150}>
                            {form.errors.subject}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="branch">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.branch} isRequired>
                        <FormLabel>Branch</FormLabel>
                        <Input {...field} placeholder="Branch" />
                        {form.errors.branch ? (
                          <FormErrorMessage w={150}>
                            {form.errors.branch}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="author">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.author} isRequired>
                        <FormLabel>Author</FormLabel>
                        <Input {...field} placeholder="Author" />
                        {form.errors.author ? (
                          <FormErrorMessage w={150}>
                            {form.errors.author}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="noOfPages">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.noOfPages} isRequired>
                        <FormLabel>No. of Pages</FormLabel>
                        <Input {...field} placeholder="No. of pages" />
                        {form.errors.noOfPages ? (
                          <FormErrorMessage w={150}>
                            {form.errors.noOfPages}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="price">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.price} isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input {...field} type="number" placeholder="Price" />
                        {form.errors.price ? (
                          <FormErrorMessage w={150}>
                            {form.errors.price}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="mrp">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.mrp} isRequired>
                        <FormLabel>MRP</FormLabel>
                        <Input {...field} type="number" placeholder="MRP." />
                        {form.errors.mrp ? (
                          <FormErrorMessage w={150}>
                            {form.errors.mrp}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <FormControl isRequired>
                    <FormLabel>Book Image</FormLabel>
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
                    Submit Book
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
