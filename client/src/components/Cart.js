import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import {CartItem} from "./CartItem";
import {CartOrderSummary} from "./CartOrderSummary";
import verifySignIn from "../utils/verifySignIn";
import {useState, useEffect} from "react";
import InfoPage from "./InfoPage";
import axios from "axios";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import {useNavigate} from "react-router-dom";
import Loader from "./Loader";

export const Cart = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const onClickDelete = (bookId) => {
    bookDetails.forEach((item) => {
      if (item._id === bookId) {
        setTotal((val) => val - item.price);
      }
    });

    setBookDetails(
      bookDetails.filter((item) => {
        return bookId !== item._id;
      })
    );
    const userId = localStorage.getItem("id");
    const data = {bookId};
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/remove-cart/${userId}`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    verifySignIn().then((res) => {
      //console.log(res);
      setisLoggedIn(res);
      if(!res){
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) {
      return;
    }

    const userId = localStorage.getItem("id");
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}auth/get-cart/${userId}`;
    const token = getFromLocalStorage("token");
    //API call to get all book ID
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //API call to get book details using id
        const arr = res.data.data;

        arr.forEach((id) => {
          const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}book/${id}`;

          axios
            .get(url, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data.data[0]);
              setBookDetails((oldVal) => [...oldVal, res.data.data[0]]);
              console.log(res.data.data[0].price);
              setTotal((val) => val + res.data.data[0].price);
            })
            .catch((err) => {
              console.log(err);
            });
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return isLoading ? (
    <Loader />
  ) : isLoggedIn ? (
    <Box
      maxW={{
        base: "3xl",
        lg: "7xl",
      }}
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        align={{
          lg: "flex-start",
        }}
        spacing={{
          base: "8",
          md: "16",
        }}
      >
        <Stack
          spacing={{
            base: "8",
            md: "10",
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Your Cart
          </Heading>

          <Stack spacing="6">
            {bookDetails.map((item) => (
              <CartItem
                key={item._id}
                onClickDelete={onClickDelete}
                book={item}
              />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary total={total} />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link
              color={mode("blue.500", "blue.200")}
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Continue shopping{" "}
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  ) : (
    <InfoPage message="You have to be logged in to access this page" />
  );
};
