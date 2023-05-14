import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import {FaArrowRight} from "react-icons/fa";
import {formatPrice} from "./PriceTag";
import axios from "axios";
const OrderSummaryItem = (props) => {
  const {label, value, children} = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = ({total}) => {
  function handlePayment() {
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}payment/create-checkout-session`;
    axios
      .post(url, {
        total: total
      })
      .then((res) => {
        console.log(res.data.url);
        window.location.replace(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        onClick={handlePayment}
      >
        Checkout
      </Button>
    </Stack>
  );
};
