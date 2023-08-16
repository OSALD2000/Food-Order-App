import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheackout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const ctx = useContext(CartContext);

  const totalAmpunt = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length === 0;

  const addItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const deleteItemHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          amount={item.amount}
          price={item.price}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={deleteItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch("https://react-4d965-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: ctx.items,
      }),
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {!hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmpunt}</span>
      </div>
      {isCheackout && (
        <Checkout onConfirm={submitOrderHandler} onCansel={props.onHideCart} />
      )}
      {!isCheackout && modalAction}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmittinModalContent = (
    <React.Fragment>
      <p>Seccessfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmittinModalContent}
    </Modal>
  );
};

export default Cart;
