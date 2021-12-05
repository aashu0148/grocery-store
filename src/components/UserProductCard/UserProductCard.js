import React,{useState} from "react";
import { ShoppingCart,MinusCircle,PlusCircle } from "react-feather";

import styles from "./UserProductCard.module.scss";

function UserProductCard() {

    const [quantity,setQuatity] = useState(0);

    const increaseQuantity = () => {
        setQuatity(quantity + 1);

    }
    const decreaseQuantity = () => {
        if(quantity === 0) return;
        setQuatity(quantity - 1);
    }


  return <div className={styles.card}>
      <div className={styles.image}>
          <div className={styles.discount}>
<span>25%</span>
          </div>
      <img src="https://images.unsplash.com/photo-1591796079433-7f41b45eb95c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODl8fGZydWl0JTIwd2l0aCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
      </div>
      <p className={styles.productName}>
          Kiwi
      </p>
      <p className={styles.netWeight}>
3 units
      </p>
      <div className={styles.bottom}>
      <p className={styles.price}>
      &#x20b9;950
      </p>
      {
          quantity === 0 ? 
           <ShoppingCart className={styles.shoppingCart} onClick={increaseQuantity} /> :
           (<div className={styles.qunatityControl}>
            <MinusCircle className={styles.qunatityControlButton} onClick={decreaseQuantity} />
            <span >{quantity}</span>
            <PlusCircle className={styles.qunatityControlButton} onClick={increaseQuantity} />
        </div>)
      }
          
      </div>
      <del className={styles.mrp}>
      &#x20b9;950
      </del>
  </div>;
}

export default UserProductCard;
