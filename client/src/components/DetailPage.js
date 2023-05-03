import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductPage from './ProductPage';

const DetailPage = () => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}book/${'637a45ddd45e2470f828ffa4'}`;
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
 
  if (error) {
    return <div>{error}</div>; 
  }

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <ProductPage></ProductPage>
  )
};


export default DetailPage;
