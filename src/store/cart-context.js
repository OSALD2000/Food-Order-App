import React from "react";

const CartContxt = React.createContext({
    items:[],
    totalAmount: 0,
    addItem: (item) =>{},
    removeItem: (id) =>{}
});

export default CartContxt;