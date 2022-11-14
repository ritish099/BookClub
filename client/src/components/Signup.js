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
import {useState} from "react";
import {Link} from "react-router-dom";
import userSchema from "../schema/UserSchema";
import {Field, Form, Formik} from "formik";
import userSignUp from "../utils/userSignUp";

export default function SignupCard() {
  const [signupSuccess, setSignupSuccess] = useState({
    success: false,
    message: "",
  });
  const [signupError, setSignupError] = useState({error: false, message: ""});
  const toast = useToast();

  if (signupSuccess.success) {
    toast({
      title: "Account succesfully created.",
      description: "Please check your inbox to verify your email",
      status: "success",
      position: "bottom-left",
      duration: 9000,
      isClosable: true,
    });
  }

  if (signupError.error) {
    toast({
      title: signupError.message,
      status: "error",
      position: "bottom-left",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>

        <Box
          alignSelf={"center"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={50}
        >
          <Formik
            validationSchema={userSchema}
            initialValues={{
              name: "",
              email: "",
              username: "",
              password: "",
              confirmpassword: "",
            }}
            onSubmit={(values, actions) =>
              userSignUp(values, actions, setSignupSuccess, setSignupError)
            }
          >
            {(props) => (
              <Form autoComplete="false">
                <Stack py={3} px={6}>
                  <Field name="name">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.name} isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} placeholder="Enter Name" />

                        {form.errors.name ? (
                          <FormErrorMessage w={150}>
                            {form.errors.name}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="email">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.email} isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} placeholder="Enter Email" />
                        {form.errors.email ? (
                          <FormErrorMessage w={150}>
                            {form.errors.email}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="username">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.username} isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input {...field} placeholder="Enter Username" />
                        {form.errors.username ? (
                          <FormErrorMessage w={150}>
                            {form.errors.username}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="password">
                    {({field, form}) => (
                      <FormControl isInvalid={form.errors.password} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Enter Password"
                        />
                        {form.errors.password ? (
                          <FormErrorMessage w={150}>
                            {form.errors.password}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack py={3} px={6}>
                  <Field name="confirmpassword">
                    {({field, form}) => (
                      <FormControl
                        isInvalid={form.errors.confirmpassword}
                        isRequired
                      >
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Enter Password"
                        />
                        {form.errors.confirmpassword ? (
                          <FormErrorMessage w={150}>
                            {form.errors.confirmpassword}
                          </FormErrorMessage>
                        ) : (
                          <FormHelperText w={150}></FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Stack>

                <Stack align={"center"}>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>

                <Stack pt={6}>
                  <Text align={"center"}>
                    Already have an account? <Link to="/signin">Sign in</Link>
                  </Text>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
