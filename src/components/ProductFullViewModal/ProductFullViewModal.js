import React, { useState } from "react";
import PropTypes from "prop-types";
import { Minus, Plus } from "react-feather";

import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";

import { getDiscountedPrice } from "utils/util";

import styles from "./ProductFullViewModal.module.scss";

function ProductFullViewModal(props) {
  const [product, setProduct] = useState(props.product);
  const [images, setImages] = useState(
    props.product ? [props.product?.thumbnail, ...props.product?.images] : []
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <Modal onClose={props.onClose}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.imageContainer}>
              <img src={images[activeImageIndex]} alt={product?.title} />
            </div>
            <div className={styles.imageSubContainer}>
              {images?.map((item, index) => (
                <div
                  className={`${styles.image} ${
                    index === activeImageIndex ? styles.activeImage : ""
                  }`}
                  key={item + index}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={item} alt={product?.title} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.details}>
              <div>
                <p className={styles.title}>{product?.title}</p>
                <p className={styles.quantity}>
                  {product?.quantityOfProduct || 1}{" "}
                  {product?.refUnit?.symbol || product?.refUnit?.name}
                </p>
              </div>
              <p className={styles.discount}>
                Discount : <span>{product?.discount}%</span>
              </p>
              <div className={styles.price}>
                <p>
                  Product MRP :{" "}
                  <span>
                    ₹ {getDiscountedPrice(product?.price, product?.discount)}
                  </span>
                  {"  "}
                  <del>{product?.price}</del>
                </p>
                <span>(Inclusive of all Taxes)</span>
              </div>
              <div className={styles.quantity}>
                <p>Quantity : </p>{" "}
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
            </div>
            <div className={styles.footer}>
              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ProductFullViewModal.propTypes = {
  onClose: PropTypes.func,
  product: PropTypes.object,
};

export default ProductFullViewModal;
