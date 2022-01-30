import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Minus, Plus, X, ChevronDown, ChevronUp } from "react-feather";
import {
  AiFillHeart as HeartIcon,
  AiOutlineHeart as HeartOutline,
} from "react-icons/ai";

import Modal from "components/Modal/Modal";
import ModalMobile from "components/Modal/ModalMobile/ModalMobile";
import Button from "components/Button/Button";
import Slider, { SliderItem } from "components/Carousel/SwipeSlider/Slider";
import BasicCarousel from "components/Carousel/BasicCarousel/BasicCarousel";
import Spinner from "components/Spinner/Spinner";

import { getDiscountedPrice } from "utils/util";
import { getProductById } from "api/user/product";
import { addToWishlist, deleteFromWishlist } from "api/user/Wishlist";

import styles from "./ProductFullViewModal.module.scss";

function ProductFullViewModal(props) {
  const [product, setProduct] = useState(props.product);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAvailableInIndex, setActiveAvailableInIndex] = useState(0);
  const [productLoaded, setProductLoaded] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    props?.product?.isFavorite || false
  );

  const isMobileView = useSelector((state) => state.isMobileView);
  const isAuthenticated = useSelector((state) => state.auth);

  const fetchProduct = () => {
    const id = product?._id;
    if (!id) return;

    getProductById(id).then((res) => {
      setProductLoaded(true);
      if (!res) return;
      setProduct(res.data);
      setIsFavorite(res.data?.isFavorite || false);
      setSimilarProducts(res?.similarProducts);
    });
  };

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

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const images = product ? [product?.thumbnail, ...product?.images] : [];

  const modalContent = (
    <div
      className={`${styles.container} ${
        isMobileView ? styles.mobileContainer : ""
      }`}
    >
      <div className={styles.header}>
        {!isMobileView && (
          <div className={styles.headerInner}>
            <X onClick={() => (props.onClose ? props.onClose() : "")} />
          </div>
        )}
        <div className={styles.main}>
          <div className={styles.left}>
            {isMobileView ? (
              <React.Fragment>
                <Slider onSlideChange={(index) => setActiveImageIndex(index)}>
                  {images?.map((item, index) => (
                    <SliderItem key={index + "" + activeImageIndex}>
                      <div className={styles.imageContainer}>
                        <img src={item} alt={product?.title} />
                      </div>
                    </SliderItem>
                  ))}
                </Slider>
                <div className={styles.dots}>
                  {images?.map((item, index) => (
                    <div
                      key={"" + item + index}
                      className={`${styles.dot} ${
                        index === activeImageIndex ? styles.activeDot : ""
                      }`}
                    />
                  ))}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.details}>
              <div className={styles.titleContainer}>
                <p className={styles.title}>{product?.title}</p>
                {isAuthenticated && (
                  <div
                    className={
                      isFavorite ? `sweet-shake ${styles.activeHeartIcon}` : ""
                    }
                    onClick={toggleIsFavorite}
                  >
                    {isFavorite ? <HeartIcon /> : <HeartOutline />}
                  </div>
                )}
              </div>
              <div className={styles.availableIn}>
                <p className={styles.title}>Available In</p>
                <div className={styles.items}>
                  {product?.availabilities?.length > 0
                    ? product.availabilities?.map((item, index) => (
                        <div
                          key={index}
                          className={`${styles.item} ${
                            activeAvailableInIndex === index
                              ? styles.activeItem
                              : ""
                          }`}
                          onClick={() => setActiveAvailableInIndex(index)}
                        >
                          {item?.quantity || "1"}{" "}
                          {item?.refUnit?.symbol || item?.refUnit?.name}
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <div className={styles.price}>
                <p>
                  Product MRP :{" "}
                  {product?.availabilities[activeAvailableInIndex]?.discount ===
                  0 ? (
                    ""
                  ) : (
                    <del>
                      ₹ {product?.availabilities[activeAvailableInIndex]?.price}
                    </del>
                  )}
                  {"  "}
                  <span>
                    ₹{" "}
                    {getDiscountedPrice(
                      product?.availabilities[activeAvailableInIndex]?.price,
                      product?.availabilities[activeAvailableInIndex]?.discount
                    )}
                  </span>
                </p>
                <span>(Inclusive of all Taxes)</span>
              </div>
              <p className={styles.discount}>
                Discount :{" "}
                <span>
                  {product?.availabilities[activeAvailableInIndex]?.discount}%
                </span>
              </p>
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
      {productLoaded ? (
        <div className={styles.body}>
          <div
            className={`${styles.details} ${
              productDetailsOpen ? styles.activeDetails : ""
            }`}
          >
            <div
              className={styles.detailsHeader}
              onClick={() => setProductDetailsOpen((prev) => !prev)}
            >
              <p className={styles.title}>Product Details</p>
              {isMobileView ? (
                productDetailsOpen ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )
              ) : (
                ""
              )}
            </div>
            {product?.shelfLife && (
              <div className={styles.detail}>
                <p className={styles.heading}>Shelf life</p>
                <p className={styles.value}>{product?.shelfLife} days</p>
              </div>
            )}
            {product?.benefits && (
              <div className={styles.detail}>
                <p className={styles.heading}>Nutrition value & Benefits</p>
                <p className={styles.value}>{product?.benefits}</p>
              </div>
            )}
            {product?.storageTemperature && (
              <div className={styles.detail}>
                <p className={styles.heading}>
                  Recommended Storage Temperature
                </p>
                <p className={styles.value}>
                  {product?.storageTemperature} degC
                </p>
              </div>
            )}
            {product?.storageTips && (
              <div className={styles.detail}>
                <p className={styles.heading}>Storage Tips</p>
                <p className={styles.value}>{product?.storageTips}</p>
              </div>
            )}
          </div>

          <div className={styles.similar}>
            <p className={styles.title}>Similar Products</p>
            <BasicCarousel
              items={similarProducts}
              onItemClick={(item, quantity) => {
                setProduct(item);
                setQuantity(quantity || 1);
              }}
              mobileView={isMobileView}
            />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );

  return isMobileView ? (
    <ModalMobile title={product?.title} onClose={props.onClose}>
      {modalContent}
    </ModalMobile>
  ) : (
    <Modal onClose={props.onClose}>{modalContent}</Modal>
  );
}

ProductFullViewModal.propTypes = {
  onClose: PropTypes.func,
  product: PropTypes.object,
};

export default ProductFullViewModal;
