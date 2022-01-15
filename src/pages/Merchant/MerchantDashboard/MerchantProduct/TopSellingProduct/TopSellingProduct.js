import React from "react";

import styles from "./TopSellingProduct.module.scss";

function TopSellingProduct(props) {
  console.log(props.productDetails);
  return (
    <div className={styles.topSellingProduct}>
      <img src={props?.productDetails.img_src} />
      <div className={styles.productDetails}>
        <span className={styles.productName}>
          {props?.productDetails.productName}
        </span>
        <span className={styles.productPrice}>
          &#8377; {props?.productDetails.price}
        </span>
        <span
          className={styles.quantity}
        >{`${props?.productDetails.selling_quantity} ${props?.productDetails.unit}`}</span>
      </div>
    </div>
  );
}

export default TopSellingProduct;
