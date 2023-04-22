import {
  Flex,
  Circle,
  Card,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Button,
  ButtonGroup,
  Divider,
  CardBody,
  Stack,
  Heading,
  CardFooter,
  Text
} from "@chakra-ui/react";
import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";
import {FiShoppingCart} from "react-icons/fi";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({rating, numReviews}: RatingProps) {
  return (
    <Flex className="review-box">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{marginLeft: "1"}}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{marginLeft: "1"}} />;
          }
          return <BsStar key={i} style={{marginLeft: "1"}} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Flex>
  );
}

function ProductAddToCart({book}) {
  return (
    <Card maxW="sm" marginBottom={"50"} backgroundColor="whitesmoke">
      <CardBody>
        <Image
          src={book.image}
          alt={book.bookName}
          minW={300}
          maxHeight={200}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{book.bookName}</Heading>

          <Flex justifyContent="space-between" alignContent="center">
            <Text
              fontSize="md"
              w={"300px"}
              fontWeight={"bold"}
              marginBottom={"5px"}
            >
              {book.author}
            </Text>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Text
              fontSize="md"
              w={"300px"}
              color={"gray.700"}
              marginBottom={"5px"}
            >
              Uploaded By :
              <Text fontSize="sm" fontWeight={"bold"} marginBottom={"10px"}>
                {book.ownerName}
              </Text>
            </Text>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                ₹
              </Box>
              {book.price ? book.price.toFixed(2) : 0}
            </Box>
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default ProductAddToCart;
