import React from "react";
import { Minus, Plus, X } from "react-feather";

import InputSelect from "components/InputControl/InputSelect/InputSelect";

import styles from "./CartPage.module.scss";

const CartPage = () => {
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
                    <div className={styles.productPrice}>₹ 30.9</div>
                  </div>
                </div>
                <div className={styles.availableIn}>
                  <InputSelect placeholder="package" />
                </div>
                <div className={styles.qtyCounter}>
                  <div className={styles.qtyValue}>1</div>
                  <div className={styles.qtyOpt}>
                    <Plus className={styles.qtyInc} />
                    <Minus className={styles.qtyDec} />
                  </div>
                </div>
                <div className={styles.totalItem_price}>₹ 464.12</div>
              </div>
              <X className={styles.deleteItem} />
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
                    <div className={styles.productPrice}>₹ 30.9</div>
                  </div>
                </div>
                <div className={styles.availableIn}>
                  <InputSelect placeholder="package" />
                </div>
                <div className={styles.qtyCounter}>
                  <div className={styles.qtyValue}>1</div>
                  <div className={styles.qtyOpt}>
                    <Plus className={styles.qtyInc} />
                    <Minus className={styles.qtyDec} />
                  </div>
                </div>
                <div className={styles.totalItem_price}>₹ 464.12</div>
              </div>
              <X className={styles.deleteItem} />
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
                    <div className={styles.productPrice}>₹ 30.9</div>
                  </div>
                </div>
                <div className={styles.availableIn}>
                  <InputSelect placeholder="package" />
                </div>
                <div className={styles.qtyCounter}>
                  <div className={styles.qtyValue}>1</div>
                  <div className={styles.qtyOpt}>
                    <Plus className={styles.qtyInc} />
                    <Minus className={styles.qtyDec} />
                  </div>
                </div>
                <div className={styles.totalItem_price}>₹ 464.12</div>
              </div>
              <X className={styles.deleteItem} />
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
                    <div className={styles.productPrice}>₹ 30.9</div>
                  </div>
                </div>
                <div className={styles.availableIn}>
                  <InputSelect placeholder="package" />
                </div>
                <div className={styles.qtyCounter}>
                  <div className={styles.qtyValue}>1</div>
                  <div className={styles.qtyOpt}>
                    <Plus className={styles.qtyInc} />
                    <Minus className={styles.qtyDec} />
                  </div>
                </div>
                <div className={styles.totalItem_price}>₹ 464.12</div>
              </div>
              <X className={styles.deleteItem} />
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
                    <div className={styles.productPrice}>₹ 30.9</div>
                  </div>
                </div>
                <div className={styles.availableIn}>
                  <InputSelect placeholder="package" />
                </div>
                <div className={styles.qtyCounter}>
                  <div className={styles.qtyValue}>1</div>
                  <div className={styles.qtyOpt}>
                    <Plus className={styles.qtyInc} />
                    <Minus className={styles.qtyDec} />
                  </div>
                </div>
                <div className={styles.totalItem_price}>₹ 464.12</div>
              </div>
              <X className={styles.deleteItem} />
            </div>
            
          </div>
        </div>
      </div>
      <div className={styles.rightPortion}>
        <div className={styles.orderTitle}>Order summary</div>
        <div className={styles.rightInner}>
          <div className={styles.totalPrice_box}>
            <div className={styles.cartTotal}>
              <div className={styles.cartTotal_text}>Total Price</div>
              <div className={styles.cartTotal_number}>₹ 123.123</div>
            </div>
            <div className={styles.totalPrice_bottomtext}>
              Shipping and taxes calculated at checkout
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
