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
  Select
} from "@chakra-ui/react";

import {useState, useEffect} from "react";
import {Field, Form, Formik} from "formik";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import verifySignIn from "../utils/verifySignIn";
import InfoPage from "./InfoPage";
import ChatButton from "./IconButton";
import notesUpload from "../utils/notesUpload";
import NotesUploadSchema from "../schema/NotesUploadSchema";

export default function NotesUpload() {
  const [uploadSuccess, setuploadSuccess] = useState({
    success: false,
    message: "",
  });
  const [uploadError, setuploadError] = useState({error: false, message: ""});
  const [notesDoc, setnotesDoc] = useState();
  const toast = useToast();

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
    await setnotesDoc(e.target.files[0]);
  };

  if (uploadSuccess.success) {
    toast({
      title: "Notes uploaded successfully",
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
            Upload your Notes
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
            validationSchema={NotesUploadSchema}
            initialValues={{
              ownerName: getFromLocalStorage("name"),
              notesTitle: "",
              subject: "",
              branch: "",
              semester: "",
            }}
            onSubmit={(values, actions) => {
              notesUpload(
                values,
                notesDoc,
                actions,
                setuploadSuccess,
                setuploadError,
              );
            }}
          >
            {(props) => (
              <Form autoComplete="false">
                <Stack py={3} px={6}>
                  <Field name="notesTitle">
                    {({field, form}) => (
                      <FormControl
                        isInvalid={form.errors.notesTitle}
                        isRequired
                      >
                        <FormLabel>Notes Title</FormLabel>
                        <Input {...field} placeholder="Notes Title" />

                        {form.errors.notesTitle ? (
                          <FormErrorMessage w={150}>
                            {form.errors.notesTitle}
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
                  <Field name="semester">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.semester} isRequired>
                        <FormLabel>Semester</FormLabel>
                        <Select {...field} placeholder="Select Semester">
                          <option value="semester1">Semester 1</option>
                          <option value="semester2">Semester 2</option>
                          <option value="semester3">Semester 3</option>
                          <option value="semester4">Semester 4</option>
                          <option value="semester5">Semester 5</option>
                          <option value="semester6">Semester 6</option>
                          <option value="semester7">Semester 7</option>
                          <option value="semester8">Semester 8</option>
                        </Select>

                        {form.errors.semester ? (
                          <FormErrorMessage w={150}>
                            {form.errors.semester}
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
                    <FormLabel>Upload pdf</FormLabel>
                    <input
                      onInput={(e) => handleImageChange(e)}
                      type="file"
                      name="notesFile"
                      accept="application/pdf"
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
                    Upload
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
