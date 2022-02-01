import React, { useState } from "react";
import { Minus, Plus, X } from "react-feather";

import { updateCart } from "api/user/cart";

import styles from "./CartMainCard.module.scss";

const CartMainCard = (props) => {
  const [quantity, setQuantity] = useState(1);
  const itemData = props.item;

  const handleUpdateCart = (productId, quantity) => {
    updateCart({ productId, quantity }).then((res) => {
      if (!res) return;
    });
  };

  return (
    <div className={styles.productDetailsbox}>
      <div className={styles.productsCardContainer}>
        <div className={styles.productCard}>
          <div className={styles.productInfo}>
            <div className={styles.productImgbox}>
              <img
                src={itemData.refProduct.thumbnail}
                className={styles.productImg}
                alt={itemData.refProduct.title}
              />
              <div className={styles.discountPrice}>
                {" "}
                {itemData.refProduct.availabilities[0].discount}%
              </div>
            </div>
            <div className={styles.aboutBox}>
              <span className={styles.productName}>
                {itemData.refProduct.title}
              </span>
              <span className={styles.availableIn}>
                {`${itemData.refProduct.availabilities[0].quantity} g`}
              </span>
              <span className={styles.productPrice}>
                ₹ {itemData.refProduct.availabilities[0].price}
              </span>
            </div>
          </div>
          <div className={styles.qtyCounter}>
            <Minus
              className={styles.qtyDec}
              onClick={() => {
                if (quantity - 1 === 0) {
                  handleUpdateCart(itemData.refProduct._id, -1);
                  return;
                }
                setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
                if (!handleUpdateCart(itemData.refProduct._id, quantity - 1))
                  return;
              }}
            />
            <div className={styles.qtyValue}>{quantity}</div>
            <Plus
              className={styles.qtyInc}
              onClick={() => {
                setQuantity((prev) => prev + 1);
                if (!handleUpdateCart(itemData.refProduct._id, quantity + 1))
                  return;
              }}
            />
          </div>
          <div className={styles.totalItem_price}>
            ₹ {itemData.totalProductPrice}
          </div>
          <X
            onClick={() => handleUpdateCart(itemData.refProduct._id, -1)}
            className={styles.deleteItemIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default CartMainCard;
