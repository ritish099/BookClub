import ProductCard from "./ProductCardHome";
import React, {useState, useEffect} from "react";
import "../styles/Products.css";
import ImageCarousel from "./ImageCarousel";
import Search from "../Search";
import getAllBooks from "../utils/getAllBooks";
import {Input, Text} from "@chakra-ui/react";
import Fuse from "fuse.js";
import ChatButton from "./IconButton";
import Loader from "./Loader";

const Products = () => {
  const [searchResult, setsearchResult] = useState([]);
  const [Books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      await getAllBooks(setBooks, setIsLoading);
    }
    getData();
  }, []);

  const fuse = new Fuse(Books, {
    keys: ["bookName", "author"],
  });

  useEffect(() => {
    setsearchResult(fuse.search(search));
    console.log(fuse.search(search));
  }, [search]);

  return !isLoading ? (
    <div className="BigDiv">
      <div className="Heading">{/* <h1>Top Deals!</h1> */}</div>

      <div className="Heading">
        <Text marginBottom={"10px"}>Books for You</Text>
      </div>

      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        backgroundColor={"white"}
        placeholder="Search for books or authors..."
        my={10}
      />

      <div className="Catalogue">
        {!searchResult.length
          ? Books.map((book) => <ProductCard key={book._id} id={book._id} book={book} />)
          : searchResult.map((book) => (
              <ProductCard id={book.item._id} book={book.item} />
            ))}
      </div>

      <ChatButton />
    </div>
  ) : (
    <Loader />
  );
};

export default Products;
