import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Minus, Plus, ShoppingCart } from "react-feather";
import {
  AiFillHeart as HeartIcon,
  AiOutlineHeart as HeartOutline,
} from "react-icons/ai";

import Button from "components/Button/Button";
import ProductFullViewModal from "components/ProductFullViewModal/ProductFullViewModal";

import { getDiscountedPrice } from "utils/util";
import { addToWishlist, deleteFromWishlist } from "api/user/Wishlist";

import styles from "./ProductCard.module.scss";
import toast from "react-hot-toast";

function ProductCard(props) {
  const { product } = props;

  const [quantity, setQuantity] = useState(1);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product?.isFavorite || false);

  const isAuthenticated = useSelector((state) => state.auth);
  const availableIn = product?.availabilities ? product?.availabilities[0] : "";
  const isMobileView = props?.mobileView ? true : false;

  const updateFavoriteOnDb = (isDelete) => {
    if (isDelete)
      deleteFromWishlist(product._id).then((res) => {
        if (!res) {
          setIsFavorite(true);
          return;
        }
        toast.success("Deleted from Wishlist");
      });
    else
      addToWishlist(product._id).then((res) => {
        if (!res) {
          setIsFavorite(false);
          return;
        }
        toast.success("Added to Wishlist");
      });
  };

  const toggleIsFavorite = () => {
    const isFav = !isFavorite;
    setIsFavorite(isFav);

    updateFavoriteOnDb(!isFav);
  };

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

        {isAuthenticated && (
          <div
            className={`${styles.heartIcon} ${
              isFavorite ? `sweet-shake ${styles.activeHeartIcon}` : ""
            }`}
            onClick={toggleIsFavorite}
          >
            {isFavorite ? <HeartIcon /> : <HeartOutline />}
          </div>
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
