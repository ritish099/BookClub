import React from "react";
import "../styles/productDetails.css";
import { useState , useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { Text, useToast, Button } from "@chakra-ui/react";
import addBookToCart from "../utils/addBookToCart";

const ProductPage = () => {
    const toast = useToast();
    const [book, setBook] = useState();
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation()
    const id = location.pathname.substring(8)
    console.log(id)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}book/${id}`;
            const response = await axios.get(url); 
            console.log(response,'HELLO')
            setDetails(response.data.data[0]);
    
            setError(null);
          } catch (error) {
            setError('Failed to fetch details.');
            setDetails(null);
          }
        };
    
        fetchData();
      }, []);
    return (
      <div className="app">
        <div className="details" key={"121121"}>
          <div className="big-img">
            <img src={details?.image} alt="" />
          </div>

          <div className="box">
            <Text fontSize={"2xl"}>{details?.bookName}</Text>
            <h2>
              {" "}
              by <span className="author">{details?.author}</span>{" "}
            </h2>

            <p>
              {" "}
              <b>Branch: </b> {details?.branch}
            </p>
            <p>
              {" "}
              <b>Uploaded by: </b> {details?.ownerName}
            </p>
            <p className="price"> ₹{details?.price}</p>

            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={() => {
                addBookToCart(id, toast);
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
}

export default ProductPage;
