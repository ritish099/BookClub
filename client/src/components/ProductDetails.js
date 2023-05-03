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
  import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
  import { FiShoppingCar  } from "react-icons/fi";

  interface Book {
    image: string;
    bookName: string;
    author: string;
    ownerName: string;
    price: number;
  }
  
  interface RatingProps {
    rating: number;
    numReviews: number;
  }
  
  function Rating({ rating, numReviews }: RatingProps) {
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
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && "s"}
        </Box>
      </Flex>
    );
  }
  
  function ProductDetailsPage({ book }: { book: Book }) {
    return (

      <Flex flexDirection="column" alignItems="center">
        <Image
          src={book.image}
          alt={book.bookName}
          maxW={500}
          maxHeight={500}
          borderRadius="lg"
          mb={6}
        />
        <Heading size="lg" mb={2}>
          {book.bookName}
        </Heading>
        <Text fontSize="md" color="gray.700" mb={2}>
          {book.author}
        </Text>
        <Text fontSize="xl" fontWeight="bold" mb={6}>
          ₹{book.price ? book.price.toFixed(2) : 0}
        </Text>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
        <Divider my={6} />
        <Stack spacing={4} align="center">
          <Rating rating={book.rating} numReviews={book.numReviews} />
          <Text color="gray.600">
            Uploaded By:{" "}
            <Text fontWeight="bold" color="gray.700">
              {book.ownerName}
            </Text>
          </Text>
        </Stack>
      </Flex>
    );
  }
  
export default ProductDetailsPage;
  