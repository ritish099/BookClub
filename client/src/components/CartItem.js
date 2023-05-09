import {
  CloseButton,
  Flex,
  Link,
} from "@chakra-ui/react";
import {PriceTag} from "./PriceTag";
import {CartProductMeta} from "./CartProductMeta";

export const CartItem = (book) => {
  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={book.bookName}
        // description={description}
        image={book.image}
        owner={book.ownerName}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <PriceTag price={book.price} currency={"INR"} />
        <CloseButton
          aria-label={`Delete ${book.bookName} from cart`}
          // onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <PriceTag price={book.price} currency={"INR"} />
      </Flex>
    </Flex>
  );
};
