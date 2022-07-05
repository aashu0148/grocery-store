import React, { useEffect, useState } from "react";
import { Minus, Plus, X } from "react-feather";

import { updateCart } from "api/user/cart";

import styles from "./CartMainCard.module.scss";

const CartMainCard = (props) => {
  const itemData = props.item;
  const [quantity, setQuantity] = useState(itemData.quantity || 1);
  const [totalOfOneItem, setTotalOfOneItem] = useState(
    itemData.quantity * itemData?.refProduct?.availabilities[0]?.price || 0
  );
  let finalPrice = totalOfOneItem;

  const handleUpdateCart = (productId, quantity) => {
    props.refreshCartData(itemData._id, quantity);
    updateCart({ productId, quantity }).then((res) => {
      if (!res) return false;
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    finalPrice += itemData?.refProduct?.availabilities[0]?.price;
    setTotalOfOneItem(finalPrice);
    handleUpdateCart(itemData.refProduct._id, quantity + 1);
  };

  const handleDecreaseQantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    finalPrice -= itemData?.refProduct?.availabilities[0]?.price;
    setTotalOfOneItem(finalPrice);
    if (quantity === 1) return;
    else handleUpdateCart(itemData.refProduct._id, quantity - 1);
  };

  useEffect(() => {
    const price =
      itemData.quantity * itemData?.refProduct?.availabilities[0]?.price;
    setTotalOfOneItem(price);
  }, [finalPrice]);

  return (
    <div className={styles.productDetailsbox}>
      <div className={styles.productsCardContainer}>
        <div className={styles.productCard}>
          <div className={styles.productInfo}>
            <div className={styles.productImgbox}>
              <img
                src={itemData?.refProduct?.thumbnail}
                className={styles.productImg}
                alt={itemData?.refProduct?.title}
              />
              <div className={styles.discountPrice}>
                {" "}
                {itemData?.refProduct?.availabilities[0]?.discount}%
              </div>
            </div>
            <div className={styles.aboutBox}>
              <span className={styles.productName}>
                {itemData?.refProduct?.title}
              </span>
              <span className={styles.availableIn}>
                {`${itemData?.refProduct?.availabilities[0]?.quantity} g`}
              </span>
              <span className={styles.productPrice}>
                ₹ {itemData?.refProduct?.availabilities[0]?.price}
              </span>
            </div>
          </div>
          <div className={styles.qtyCounter}>
            <Minus className={styles.qtyDec} onClick={handleDecreaseQantity} />
            <div className={styles.qtyValue}>{quantity}</div>
            <Plus className={styles.qtyInc} onClick={handleIncreaseQuantity} />
          </div>
          <div className={styles.totalItem_price}>
            ₹ {quantity * itemData?.refProduct?.availabilities[0]?.price}
          </div>
          <X
            onClick={() => handleUpdateCart(itemData?.refProduct?._id, -1)}
            className={styles.deleteItemIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default CartMainCard;
