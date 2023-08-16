import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [btnAnimation, setBtnAnimation] = useState(false);
  const numberOfCartItem = ctx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ""}`;
  const { items } = ctx;
  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    setBtnAnimation(true);
    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);
    
    return() => {
      clearTimeout(timer);
    }
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
