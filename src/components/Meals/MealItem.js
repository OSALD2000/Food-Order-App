import React, { useContext } from "react";
import CartContxt from "../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const ctx = useContext(CartContxt);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    ctx.addItem({
      id: props.id,
      name: props.mealName,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm addToCartHandler={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
