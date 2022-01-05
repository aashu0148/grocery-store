import React from "react";

import Button from "components/Button/Button";

import styles from "./CartPage.module.scss";

const CartPage = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.leftPortion}>
        <div className={styles.leftInner}>
          <div className={styles.labelTop}>
            <h4>PRODUCT</h4>
            <h4>PRICE</h4>
            <h4>qty</h4>
            <h4>total</h4>
          </div>
          <div className={styles.productDetailsbox}>
            <div className={styles.aboutProducts}>
              <div className={styles.productInfo}>
                <div className={styles.productImgbox}>
                  <img
                    src="https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="productName"
                    className={styles.productImg}
                  />
                </div>
                <div className={styles.deleteItem}>❌</div>
                <div className={styles.productName}>
                  Apples Lorem ipsum dolor sit amet.
                </div>
              </div>
              <div className={styles.productPrice}>333.9</div>
              <div className={styles.qtyCounter}>
                <div className={styles.qtyDec}>-</div>
                <div className={styles.qty}>1</div>
                <div className={styles.qtyInc}>+</div>
              </div>
              <div className={styles.totalItem_price}>$464.12</div>
            </div>
            <div className={styles.aboutProducts}>
              <div className={styles.productInfo}>
                <div className={styles.productImgbox}>
                  <img
                    src="https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="productName"
                    className={styles.productImg}
                  />
                </div>
                <div className={styles.deleteItem}>❌</div>
                <div className={styles.productName}>Apples</div>
              </div>
              <div className={styles.productPrice}>333.9</div>
              <div className={styles.qtyCounter}>
                <button className={styles.qtyDec}>-</button>
                <div className={styles.qty}>1</div>
                <button className={styles.qtyInc}>+</button>
              </div>
              <div className={styles.totalItem_price}>$464.12</div>
            </div>
            <div className={styles.aboutProducts}>
              <div className={styles.productInfo}>
                <div className={styles.productImgbox}>
                  <img
                    src="https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="productName"
                    className={styles.productImg}
                  />
                </div>
                <div className={styles.deleteItem}>❌</div>
                <div className={styles.productName}>Apples</div>
              </div>
              <div className={styles.productPrice}>333.9</div>
              <div className={styles.qtyCounter}>
                <div className={styles.qtyDec}>-</div>
                <div className={styles.qty}>1</div>
                <div className={styles.qtyInc}>+</div>
              </div>
              <div className={styles.totalItem_price}>$464.12</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightPortion}>
        <div className={styles.rightInner}>
          <div className={styles.horizontalBar}></div>
          <div className={styles.totalPrice_box}>
            <div className={styles.cartTotal}>
              <div className={styles.cartTotal_text}>Cart total</div>
              <div className={styles.cartTotal_number}>$123.123</div>
            </div>
            <div className={styles.totalPrice_bottomtext}>
              Shipping and taxes calculated at checkout
            </div>
          </div>
          <div className={styles.checkoutBox}>
            <Button bordered >Checkout</Button>
          </div>
          <div className={styles.horizontalBar}></div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
