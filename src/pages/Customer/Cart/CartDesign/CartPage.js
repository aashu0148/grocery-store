import React from "react";

import styles from "./CartPage.module.scss";

import CartData from "../CartData";
import CartMainCard from "../CartMainCard";

const CartPage = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.leftPortion}>
        <div className={styles.shopTitle}>
          Your Shopping Cart <span>(2 Items)</span>
        </div>
        <div className={styles.leftInner}>
          {CartData.map((Items) => {
            return <CartMainCard key={Items.productId} items={Items} />;
          })}
        </div>
      </div>
      <div className={styles.rightPortion}>
        <div className={styles.rightMainChild}>
          <div className={styles.orderTitle}>Order summary</div>
          <div className={styles.rightInner}>
            <div className={styles.cartTotal_box}>
              <div className={styles.cartTotal_details}>
                <div className={styles.itemPrice}>
                  <div className={styles.cartTotal_text}>Item Price</div>
                  <div className={styles.cartTotal_number}>₹ 123.123</div>
                </div>
                <div className={styles.taxPrice}>
                  <div className={styles.cartTotal_text}>Tax Charge</div>
                  <div className={styles.cartTotal_number}>₹ 123.123</div>
                </div>
                <div className={styles.shippingCharges}>
                  <div className={styles.cartTotal_text}>Shipping Charge</div>
                  <div className={styles.cartTotal_number}>₹ 123.123</div>
                </div>
                <div className={styles.totalPrice}>
                  <div className={styles.cartTotal_text}>Total Price</div>
                  <div className={styles.cartTotal_number}>₹ 123.123</div>
                </div>
              </div>
              <div className={styles.totalPrice_bottomtext}>
                Procced to Checkout for Payment details.
              </div>
            </div>
            <div className={styles.checkoutBox}>
              <button className={styles.checkoutButton}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
