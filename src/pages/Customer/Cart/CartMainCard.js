import React, { useState } from "react";

import { Minus, Plus, X } from "react-feather";

import styles from "./CartMainCard.module.scss";

const CartMainCard = (props) => {
  const [quantity, setQuantity] = useState(1);
  const itemData = props.items;

  return (
    <div className={styles.productDetailsbox}>
      <div className={styles.productsCardContainer}>
        <div className={styles.productCard}>
          <div className={styles.productInfo}>
            <div className={styles.productImgbox}>
              <img
                src={itemData.productImg}
                className={styles.productImg}
                alt={itemData.productName}
              />
              <div className={styles.discountPrice}>
                {" "}
                {itemData.discountPr}%
              </div>
            </div>
            <div className={styles.aboutBox}>
              <div className={styles.productName}>{itemData.productName}</div>
              <div className={styles.availableIn}>{itemData.availIn} kg</div>
              <div className={styles.productPrice}>
                ₹ {itemData.productPrice}
              </div>
            </div>
          </div>
          <div className={styles.qtyCounter}>
            <Minus
              className={styles.qtyDec}
              onClick={() =>
                setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
              }
            />
            <div className={styles.qtyValue}>{quantity}</div>
            <Plus
              className={styles.qtyInc}
              onClick={() => setQuantity((prev) => prev + 1)}
            />
          </div>
          <div className={styles.totalItem_price}>
            ₹ {itemData.totalProductPrice}
          </div>
          <X className={styles.deleteItemIcon} />
          {/* <span className={styles.deleteItem}>Remove</span> */}
        </div>
      </div>
    </div>
  );
};

export default CartMainCard;
