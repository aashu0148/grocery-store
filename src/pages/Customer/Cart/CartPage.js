import React, { useState } from "react";
import { Minus, Plus, X } from "react-feather";

import InputSelect from "components/InputControl/InputSelect/InputSelect";

import styles from "./CartPage.module.scss";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.outer}>
      <div className={styles.leftPortion}>
        <div className={styles.shopTitle}>
          Your Shopping Cart <span>(2 Items)</span>
        </div>
        <div className={styles.leftInner}>
          <div className={styles.productDetailsbox}>
            <div className={styles.productsList}>
              <div className={styles.productCard}>
                <div className={styles.productInfo}>
                  <div className={styles.productImgbox}>
                    <img
                      src="https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt="productName"
                      className={styles.productImg}
                    />
                    <div className={styles.discountPrice}>-5%</div>
                  </div>
                  <div className={styles.aboutBox}>
                    <div className={styles.productName}>
                      Apples Lorem ipsum dolor sit amet.
                    </div>
                    <div className={styles.availableIn}>5kg</div>
                    <div className={styles.productPrice}>₹ 30.9</div>
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
                <div className={styles.totalItem_price}>₹ 464.12</div>
                <X className={styles.deleteItemIcon} />
              </div>
            </div>
            <div className={styles.productsList}>
              <div className={styles.productCard}>
                <div className={styles.productInfo}>
                  <div className={styles.productImgbox}>
                    <img
                      src="https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt="productName"
                      className={styles.productImg}
                    />
                    <div className={styles.discountPrice}>-5%</div>
                  </div>
                  <div className={styles.aboutBox}>
                    <div className={styles.productName}>
                      Apples Lorem ipsum dolor sit amet.
                    </div>
                    <div className={styles.availableIn}>5kg</div>
                    <div className={styles.productPrice}>₹ 30.9</div>
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
                <div className={styles.totalItem_price}>₹ 464.12</div>
                <X className={styles.deleteItemIcon} />
              </div>
            </div>
            <div className={styles.productsList}>
              <div className={styles.productCard}>
                <div className={styles.productInfo}>
                  <div className={styles.productImgbox}>
                    <img
                      src="https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt="productName"
                      className={styles.productImg}
                    />
                    <div className={styles.discountPrice}>-5%</div>
                  </div>
                  <div className={styles.aboutBox}>
                    <div className={styles.productName}>
                      Apples Lorem ipsum dolor sit amet.
                    </div>
                    <div className={styles.availableIn}>5kg</div>
                    <div className={styles.productPrice}>₹ 30.9</div>
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
                <div className={styles.totalItem_price}>₹ 464.12</div>
                <X className={styles.deleteItemIcon} />
              </div>
            </div>
            <div className={styles.productsList}>
              <div className={styles.productCard}>
                <div className={styles.productInfo}>
                  <div className={styles.productImgbox}>
                    <img
                      src="https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt="productName"
                      className={styles.productImg}
                    />
                    <div className={styles.discountPrice}>-5%</div>
                  </div>
                  <div className={styles.aboutBox}>
                    <div className={styles.productName}>
                      Apples Lorem ipsum dolor sit amet.
                    </div>
                    <div className={styles.availableIn}>5kg</div>
                    <div className={styles.productPrice}>₹ 30.9</div>
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
                <div className={styles.totalItem_price}>₹ 464.12</div>
                <X className={styles.deleteItemIcon} />
              </div>
            </div>
           
          </div>
        </div>
      </div>
      <div className={styles.rightPortion}>
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
            <button type="submit" className={styles.checkoutButton}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
