import React, { useRef, useState } from "react";
import classes from "./MealitemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = (props) => {
  const amountInput = useRef();
  const [amountIsValid, setAmoutIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = parseInt(amountInput.current.value);
    console.log(enteredAmount);
    if (!Number(enteredAmount) || enteredAmount < 1 || enteredAmount > 5) {
      setAmoutIsValid(false);
      return;
    }
    if (!amountIsValid) {
      setAmoutIsValid(true);
    }
    props.addToCartHandler(enteredAmount);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInput}
        label="Amount"
        input={{
          type: "number",
          id: "amount",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Plase enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
