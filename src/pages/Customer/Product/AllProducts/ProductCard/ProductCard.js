import React, { useState } from "react";
import PropTypes from "prop-types";
import { Minus, Plus, ShoppingCart } from "react-feather";

import { getDiscountedPrice } from "utils/util";
import Button from "components/Button/Button";

import styles from "./ProductCard.module.scss";

function ProductCard(props) {
  const { product } = props;

  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.container}>
      {product?.discount ? (
        <div
          className={`${styles.discount} ${
            product?.discount > 15 ? styles.red : ""
          }`}
        >
          -{product?.discount}%
        </div>
      ) : (
        ""
      )}
      <div className={styles.imageContainer}>
        <img src={product?.thumbnail} alt={product?.title} />
      </div>
      <div className={styles.body}>
        <div className={styles.details}>
          <p className={styles.title}>{product.title}</p>

          <p className={styles.price}>
            <span>
              {`₹ ${getDiscountedPrice(product?.price, product?.discount)}`}
            </span>
            {` / ${product.refUnit?.symbol?.trim() || "piece"}`}
          </p>
        </div>

        <div className={styles.footer}>
          <div className={styles.quantity}>
            <Minus
              onClick={() =>
                setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
              }
            />
            <input
              type="tel"
              value={quantity}
              onChange={(event) =>
                event.target.value > -1
                  ? setQuantity(parseInt(event.target.value) || "")
                  : ""
              }
              onBlur={(event) =>
                event.target.value < 0 || !event.target.value
                  ? setQuantity(1)
                  : ""
              }
            />
            <Plus onClick={() => setQuantity((prev) => prev + 1)} />
          </div>
          <Button>
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
