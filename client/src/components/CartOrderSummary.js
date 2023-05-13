import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";
import axios from "axios";
import { useState } from "react";

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = ({ total }) => {

  const [key, setKey] = useState();
  const [order, setOrder] = useState();

  const checkoutHandler = async (total) => {
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}payment/getkey`;
    axios.get(url).then((response) => {
      setKey(response.data.key)

      const data = {total: total};

      const newUrl = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}payment/checkout`;
      axios.post(newUrl,  data ).then((response) => {
        setOrder(response.data.order)
        console.log(response.data.order)
      });
    }).catch((error) => {
      console.log(error);
    });



    const options = {
      key: key,
      amount: total,
      currency: "INR",
      name: "BookClub",
      description: "Old book reselling website",
      image: "https://img.freepik.com/free-icon/user_318-159711.jpg",
      order_id: order.id,
      callback_url: `${process.env.REACT_APP_SERVER_BASE_URL_DEV}payment/payment-verification`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3477eb",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Stack
      bgColor={"white"}
      spacing="8"
      borderWidth="1px"
      rounded="lg"
      padding="8"
      width="full"
    >
      <Heading size="md">Total Amount</Heading>

      <Stack spacing="6">
        {/* <OrderSummaryItem label="Subtotal" value={formatPrice(597)} /> */}
        {/* <OrderSummaryItem label="Shipping + Tax">
          <Link href="#" textDecor="underline">
            Calculate shipping
          </Link>
        </OrderSummaryItem> */}
        {/* <OrderSummaryItem label="Coupon Code">
          <Link href="#" textDecor="underline">
            Add coupon code
          </Link>
        </OrderSummaryItem> */}
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(total)}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={checkoutHandler}
      >
        Checkout
      </Button>
    </Stack>
  );
};
