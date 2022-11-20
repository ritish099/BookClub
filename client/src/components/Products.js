import ProductCard from "./ProductCard";
import React, { useState, useEffect } from 'react';
import "../styles/Products.css"
import ImageCarousel from "./ImageCarousel";
import Search from "../Search";
import getAllBooks from "../utils/getAllBooks";
import { Input } from "@chakra-ui/react";


const Products = () => {
  const [allBooks, setallBooks] = useState([]);
  const [Books,setBooks] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    getAllBooks(setBooks);
  }, [])
  
  return (
    <div className="BigDiv">
      <div className="Heading">{/* <h1>Top Deals!</h1> */}</div>

      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          //console.log(e.target.value);
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

        {Books.map((book) => (
          <ProductCard id={book._id} book={book} />
        ))}

      </div>
      {/* <ImageCarousel Heading="Bestsellers in Books" />
        <ImageCarousel Heading="Bestsellers in Instruments" /> */}
    </div>
  );
}

export default Products;