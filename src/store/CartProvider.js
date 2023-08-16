import React, { useReducer } from "react";
import CartContxt from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems;
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.value.price * action.value.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.value.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.value.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.value);
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  } else if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(
        (item) => !(item.id === existingCartItem.id)
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  } else if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", value: item });
  };

  const removeitemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeitemToCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContxt.Provider value={cartContext}>
      {props.children}
    </CartContxt.Provider>
  );
};

export default CartProvider;
