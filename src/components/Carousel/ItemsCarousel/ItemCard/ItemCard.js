import React, { useState } from "react";
import PropTypes from "prop-types";
import { Plus, Minus } from "react-feather";

import { getDiscountedPrice } from "utils/util";

import styles from "./ItemCard.module.scss";

function ItemCard(props) {
  const { item } = props;
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity === 0) return;
    setQuantity(quantity - 1);
  };

  const availableIn = item?.availabilities ? item.availabilities[0] : "";
  return (
    <div className={styles.itemCard}>
      <div className={styles.image}>
        <img src={item?.thumbnail} alt={item?.title || "Product"} />
        <div className={styles.addProduct}>
          {quantity ? (
            <div className={styles.quantityControl}>
              <Minus
                className={styles.quantityControlButton}
                onClick={decreaseQuantity}
              />
              <span>{quantity}</span>
              <Plus
                className={styles.quantityControlButton}
                onClick={increaseQuantity}
              />
            </div>
          ) : (
            <Plus
              className={styles.quantityControlButton}
              onClick={increaseQuantity}
            />
          )}
        </div>
      </div>
      <p className={styles.productName}>{item?.title}</p>
      <p>
        <span>
          {!availableIn?.quantity || availableIn?.quantity < 2
            ? "1"
            : availableIn?.quantity}{" "}
          {availableIn?.refUnit?.symbol?.trim() || availableIn?.refUnit?.name}
        </span>
        <br />
        <span className={styles.discountedPrice}>
          {"₹"}
          {getDiscountedPrice(availableIn?.price, availableIn?.discount)}{" "}
        </span>
        &nbsp; &nbsp;
        {availableIn?.discount ? (
          <del className={styles.mrp}>
            {"₹"}
            {availableIn?.price}
          </del>
        ) : (
          ""
        )}
      </p>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object,
};

export default ItemCard;
