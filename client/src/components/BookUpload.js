import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  FormControl,
  Icon,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import verifySignIn from "../utils/verifySignIn";
import InfoPage from "./InfoPage";
import BookUploadSchema from "../schema/BookUploadSchema";
import bookUpload from "../utils/bookUpload";

const avatars = [
  {
    name: "JK Rowling",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6_bDTUHf6U6GMnaKCgOmj9jkws-Odz26kfEHOahyA0Q&s",
  },
  {
    name: "William Shakespeare",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ufFZaIobqUpvRGMeTyReoN3lsaUfyhPv_KlcW1NNfQ&s",
  },
  {
    name: "Agatha Christie",
    url: "https://m.media-amazon.com/images/M/MV5BMTU3OTYzMzY4NV5BMl5BanBnXkFtZTcwMDIxOTIyOA@@._V1_.jpg",
  },
  {
    name: "Stephen King",
    url: "https://images.hindustantimes.com/img/2022/09/21/550x309/stephen_king_1663760023661_1663760031673_1663760031673.jpg",
  },
  {
    name: "Danielle Steel",
    url: "https://cdn.britannica.com/13/136513-050-D53938B1/Danielle-Steel.jpg",
  },
];

export default function BookUpload() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    verifySignIn().then((res) => {
      //console.log(res);
      setisLoggedIn(res);
    });
  }, []);

  const val = useBreakpointValue({base: "md", md: "lg"});
  const val1 = "44px";
  const val2 = "60px";
  const minSizes = useBreakpointValue({base: val1, md: val2});
  return isLoggedIn ? (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{base: 1, sm: 1, md: 1, lg: 2}}
        spacing={{base: 5, lg: 32}}
        py={{base: 10, sm: 20, lg: 32}}
      >
        <Stack spacing={{base: 10, md: 20}}>
          <Heading
            lineHeight={1.1}
            fontSize={{base: "3xl", sm: "4xl", md: "5xl", lg: "6xl"}}
          >
            We got fiction{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            non-fiction books from some of the top selling authors
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={val}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{base: "4xl", md: "6xl"}}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{base: "sm", md: "lg"}}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={minSizes}
              minHeight={minSizes}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{base: 4, sm: 6, md: 8}}
          spacing={{base: 8}}
          maxW={{lg: "lg"}}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{base: "2xl", sm: "3xl", md: "4xl"}}
            >
              Upload your book
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{base: "sm", sm: "md"}}>
              We’re looking to create a community where one can upload their
              rightfully owned books and get paid in real time. Your
              contribution to the community is valuable to us
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <Formik
                validationSchema={BookUploadSchema}
                initialValues={{
                  bookName: "",
                  subject: "",
                  branch: "",
                  price: "",
                  mrp: "",
                  author: "",
                  noOfPages: "",
                }}
                onSubmit={(values, actions) => {
                  bookUpload(values, actions);
                }}
              >
                {(props) => (
                  <Form autoComplete="false">
                    <Stack py={3} px={6}>
                      <Field name="bookName">
                        {({field, form}) => (
                          <FormControl
                            isInvalid={form.errors.bookName}
                            isRequired
                          >
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
                          <FormControl
                            isInvalid={form.errors.subject}
                            isRequired
                          >
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
                          <FormControl
                            isInvalid={form.errors.branch}
                            isRequired
                          >
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
                          <FormControl
                            isInvalid={form.errors.author}
                            isRequired
                          >
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
                          <FormControl
                            isInvalid={form.errors.noOfPages}
                            isRequired
                          >
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
                            <Input
                              {...field}
                              type="number"
                              placeholder="Price"
                            />
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
                            <Input
                              {...field}
                              type="number"
                              placeholder="MRP."
                            />
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

                    <Stack align={"center"}>
                      <Button
                        mt={8}
                        fontFamily={"heading"}
                        colorScheme="teal"
                        isLoading={props.isSubmitting}
                        w={"full"}
                        type="submit"
                        bgGradient="linear(to-r, red.400,pink.400)"
                        color={"white"}
                        _hover={{
                          bgGradient: "linear(to-r, red.400,pink.400)",
                          boxShadow: "xl",
                        }}
                      >
                        Submit Book
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
            {/* <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Submit
            </Button> */}
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{filter: "blur(70px)"}}
      />
    </Box>
  ) : (
    <InfoPage message="You have to be logged in to access this page" />
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({base: "100%", md: "40vw", lg: "30vw"})}
      zIndex={useBreakpointValue({base: -1, md: -1, lg: 0})}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    ></Icon>
  );
};
