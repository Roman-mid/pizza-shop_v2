import React from "react";

import { Link } from "react-router-dom";
import img from '../assets/img/empty-cart.png'

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty
      </h2>
      <p>
        You haven't ordered any pizzas yet
      </p>
      <img src={img} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Choose your pizza</span>
      </Link>
    </div>
  )
};

export default CartEmpty;
