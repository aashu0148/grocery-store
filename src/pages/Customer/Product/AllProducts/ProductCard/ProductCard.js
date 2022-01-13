import React, { useState } from "react";
import PropTypes from "prop-types";
import { Minus, Plus, ShoppingCart } from "react-feather";

import Button from "components/Button/Button";
import ProductFullViewModal from "components/ProductFullViewModal/ProductFullViewModal";

import { getDiscountedPrice } from "utils/util";

import styles from "./ProductCard.module.scss";

function ProductCard(props) {
  const { product } = props;

  const [quantity, setQuantity] = useState(1);
  const [showProductModal, setShowProductModal] = useState(false);

  const availableIn = product?.availabilities ? product?.availabilities[0] : "";
  const isMobileView = props?.mobileView ? true : false;

  return (
    <>
      {showProductModal && (
        <ProductFullViewModal
          onClose={() => setShowProductModal(false)}
          product={product}
        />
      )}
      <div
        className={`${styles.container} ${
          isMobileView ? styles.mobileContainer : ""
        }`}
      >
        {availableIn?.discount ? (
          <div
            className={`${styles.discount} ${
              availableIn?.discount > 15 ? styles.red : ""
            }`}
          >
            -{availableIn?.discount}%
          </div>
        ) : (
          ""
        )}
        <div
          className={styles.imageContainer}
          onClick={() => setShowProductModal(true)}
        >
          <img src={product?.thumbnail} alt={product?.title} />
        </div>
        <div className={styles.body} onClick={() => setShowProductModal(true)}>
          <div className={styles.details}>
            <p className={styles.title} title={product?.title}>
              {product?.title}
            </p>

            <p className={styles.price}>
              <span>
                {`₹ ${getDiscountedPrice(
                  availableIn?.price,
                  availableIn?.discount
                )}`}
              </span>
              {` / ${
                !availableIn?.quantity || availableIn?.quantity < 2
                  ? ""
                  : availableIn?.quantity
              }${
                availableIn?.refUnit?.symbol?.trim() ||
                availableIn?.refUnit?.name
              }`}
            </p>
          </div>
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
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  mobileView: PropTypes.bool,
};

export default ProductCard;
