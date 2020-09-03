import React, { useEffect } from "react";
import fakeData from "../../fakeData";
import { useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);

  const removeProduct = (productKey) => {
    console.log("remove clicked", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    // cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  return (
    <div>
      <h1>Cart Itmes: {cart.length}</h1>
      {cart.map((pd) => (
        <ReviewItem
          key={pd.key}
          removeProduct={removeProduct}
          product={pd}
        ></ReviewItem>
      ))}
    </div>
  );
};

export default Review;
