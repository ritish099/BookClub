const express = require("express");

//defining all controller functions, using array as example
const products = [
  {name: "Product 1", price: "100", user: "A"},
  {name: "Product 2", price: "200", user: "B"},
  {name: "Product 3", price: "300", user: "C"},
  {name: "Product 4", price: "400", user: "D"},
];

const getAllProducts = (req, res) => {
  try {
    res.status(200).json({
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Some error occured");
  }
};

module.exports = {
  getAllProducts,
};
