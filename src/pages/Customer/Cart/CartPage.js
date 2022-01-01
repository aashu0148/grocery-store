import React,{useState} from "react";


import { Minus, Plus} from "react-feather";


import styles from "./CartPage.module.scss";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.outer}>
      <div className={styles.leftPortion}>
        <div className={styles.leftInner}>
          <div className={styles.labelTop}>
            <h3>PRODUCT</h3>
            <h3>PRICE</h3>
            <h3>qty</h3>
            <h3>total</h3>
          </div>
          <div className={styles.productDetailsbox}>
            <div className={styles.aboutProducts}>
              <div className={styles.productInfo}>
                <div className={styles.productImg}></div>
                <div className={styles.productName}></div>
              </div>
              <div className={styles.productPrice}>333.9</div>
              <div className={styles.qtyCounter}>
                <div className={styles.qtyDec}>-</div>
                <div className={styles.qty}>1</div>
                <div className={styles.qtyInc}>+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightPortion}>
          <div className={styles.rightInner}>
            <div className={styles.horizontalBar}></div>
                <div className={styles.cartTotal}>
                            <div className={styles.totalPrice}>
                                
                                
                                </div>    
                </div>
          </div>
           </div>
    </div>
  );
};

export default CartPage;
