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
  useColorModeValue,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import LoginSchema from "../schema/LoginSchema";

export default function SignupCard() {
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
            Sign in
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
            validationSchema={LoginSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form autoComplete="false">
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

                <Stack align={"center"}>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>

                <Stack pt={6}>
                  <Text align={"center"}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
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
