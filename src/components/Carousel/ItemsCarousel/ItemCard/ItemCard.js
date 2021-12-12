import React, { useState } from "react";
import { Plus, Minus } from "react-feather";

import styles from "./ItemCard.module.scss";

function ItemCard() {
  const [quantity, setQuatity] = useState(0);

  const increaseQuantity = () => {
    setQuatity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity === 0) return;
    setQuatity(quantity - 1);
  };

  return (
    <div className={styles.itemCard}>
      <div className={styles.image}>
        <img
          src="https://www.bigbasket.com/media/uploads/p/s/10000159_25-fresho-potato.jpg"
          alt="item"
        />
        <div className={styles.addProduct}>
          {quantity ? (
            <div className={styles.qunatityControl}>
              <Minus
                className={styles.qunatityControlButton}
                onClick={decreaseQuantity}
              />
              <span>{quantity}</span>
              <Plus
                className={styles.qunatityControlButton}
                onClick={increaseQuantity}
              />
            </div>
          ) : (
            <Plus
              className={styles.qunatityControlButton}
              onClick={increaseQuantity}
            />
          )}
        </div>
      </div>
      <p className={styles.productName}>Product name </p>
      <p>
        <span>3 kg</span>
        <br />
        <span className={styles.discountedPrice}>&#x20B9;100</span>
        &nbsp; &nbsp;
        <del className={styles.mrp}>&#x20B9;110</del>
      </p>
    </div>
  );
}

export default ItemCard;
