import ProductCard from "./ProductCard";
import React, {useState, useEffect} from "react";
import "../styles/Products.css";
import ImageCarousel from "./ImageCarousel";
import Search from "../Search";
import getAllBooks from "../utils/getAllBooks";
import {Input} from "@chakra-ui/react";
import Fuse from "fuse.js";

const Products = () => {
  const [searchResult, setsearchResult] = useState([]);
  const [Books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getData() {
      await getAllBooks(setBooks);
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

  return (
    <div className="BigDiv">
      <div className="Heading">{/* <h1>Top Deals!</h1> */}</div>

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
        {/* <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/> */}
        {/* {searchResult.map((book) => (
          <ProductCard id={book._id} book={book} />
        ))} */}

        {!searchResult.length
          ? Books.map((book) => <ProductCard id={book._id} book={book} />)
          : searchResult.map((book) => (
              <ProductCard id={book.item._id} book={book.item} />
            ))}
      </div>
      {/* <ImageCarousel Heading="Bestsellers in Books" />
        <ImageCarousel Heading="Bestsellers in Instruments" /> */}
    </div>
  );
};

export default Products;
