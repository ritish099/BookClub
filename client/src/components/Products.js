import ProductCard from "./ProductCard";
import React, { useState } from 'react';
import "../styles/Products.css"
import ImageCarousel from "./ImageCarousel";


const Products = () => {
  const [Products,setProducts] = useState([]);
  return (
    <div className="BigDiv">
        <div className="Heading">
            <h1>Top Deals!</h1>
        </div>

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
        <ImageCarousel Heading="Bestsellers in Books" />
        <ImageCarousel Heading="Bestsellers in Instruments" />
    </div>
  )
}

export default Products;