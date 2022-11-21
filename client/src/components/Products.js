import ProductCard from "./ProductCard";
import React, { useState, useEffect } from 'react';
import "../styles/Products.css"
import ImageCarousel from "./ImageCarousel";
import Search from "../Search";
import getAllBooks from "../utils/getAllBooks";


const Products = () => {
  const [Books,setBooks] = useState([]);

  useEffect(() => {
    getAllBooks(setBooks);
  }, [])
  
  return (
    <div className="BigDiv">
        <div className="Heading">
            <h1>Top Deals!</h1>
        </div>

        { <Search /> }

        <div className="Catalogue">
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
            <ProductCard name="AB" price="100$" user="sd"/>
        </div>
        {/* <ImageCarousel Heading="Bestsellers in Books" />
        <ImageCarousel Heading="Bestsellers in Instruments" /> */}
    </div>
  )
}

export default Products;