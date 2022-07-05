import React, { useState, useEffect } from "react";

import { getDetailsOfCart } from "api/user/cart";

import styles from "./CartPage.module.scss";

import CartMainCard from "../CartMainCard";
import Spinner from "components/Spinner/Spinner";

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [isCartDataFetched, setIsCartDataFetched] = useState(false);
  const [shippingCharge, setShippingCharge] = useState(0);
  let total = 0;
  const calcFirstBill = () => {
    if (cartData.length === 0) return 0;
    const priceArr = cartData.map(
      (item) => item.quantity * item?.refProduct?.availabilities[0]?.price
    );
    total = priceArr.reduce((acc, curr) => acc + curr);
    return total;
  };

  const updateFinalBill = (productId, quantity) => {
    const dummyCartData = [...cartData];
    const index = dummyCartData.findIndex((item) => item._id === productId);
    if (index < 0) return;
    dummyCartData[index].quantity = quantity;
    if (quantity === -1) {
      dummyCartData.splice(index, 1);
    }
    setCartData(dummyCartData);
  };

  useEffect(() => {
    getDetailsOfCart().then((res) => {
      if (!res) {
        setIsCartDataFetched(false);
        setShippingCharge(0);
      }
      if (res.data?.products.length) setShippingCharge(50);
      setCartData(res.data?.products);
      setIsCartDataFetched(true);
    });
  }, []);

  const totalPrice = calcFirstBill();
  return (
    <div className={styles.outer}>
      <div className={styles.leftPortion}>
        <div className={styles.shopTitle}>
          Your Shopping Cart <span>({cartData.length} Items)</span>
        </div>
        <div className={styles.leftInner}>
          {!isCartDataFetched ? (
            <Spinner />
          ) : (
            cartData.length !== 0 &&
            cartData.map((item) => {
              return (
                <CartMainCard
                  key={item._id}
                  item={item}
                  refreshCartData={updateFinalBill}
                />
              );
            })
          )}
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
                  <div className={styles.cartTotal_number}>{`₹ ${
                    totalPrice - totalPrice / 10
                  }`}</div>
                </div>
                <div className={styles.taxPrice}>
                  <div className={styles.cartTotal_text}>Tax Charge(10%)</div>
                  <div className={styles.cartTotal_number}>
                    {cartData.length ? `₹ ${totalPrice / 10}` : `₹ 0`}
                  </div>
                </div>
                <div className={styles.shippingCharges}>
                  <div className={styles.cartTotal_text}>Shipping Charge</div>
                  <div className={styles.cartTotal_number}>
                    {cartData.length ? `₹ ${shippingCharge}` : `₹ 0`}
                  </div>
                </div>
                <div className={styles.totalPrice}>
                  <div className={styles.cartTotal_text}>Total Price</div>
                  <div className={styles.cartTotal_number}>{`₹ ${
                    totalPrice + shippingCharge
                  }`}</div>
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
