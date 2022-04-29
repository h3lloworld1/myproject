import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isSubmitting, setIsSumbitting] = useState(false);
  const [submitted, setIsSubmitted] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const orderHandler = () => {
    setShowForm(true);
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
    console.log({ ...item });
  };

  const onConfirmHandler = async (userData) => {
    setIsSumbitting(true);
    await fetch(
      "https://react-fetch-82867-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSumbitting(false);
    setIsSubmitted(true);
    cartCtx.clear();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && (
        <Checkout onConfirm={onConfirmHandler} onCancel={props.onClose} />
      )}
      {!showForm && modalAction}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const submittedModalContent = (
    <React.Fragment>
      <p>Order is succesfully submitted</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !submitted && modalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && submitted && submittedModalContent}
    </Modal>
  );
};

export default Cart;
