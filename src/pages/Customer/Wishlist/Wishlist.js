import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Spinner from "components/Spinner/Spinner";
import ProductCard from "../Product/AllProducts/ProductCard/ProductCard";

import { getWishlist } from "api/user/Wishlist";

import styles from "./Wishlist.module.scss";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const isMobileView = useSelector((state) => state.isMobileView);

  const fetchAllProductsFromWishlist = () => {
    getWishlist().then((res) => {
      setDataLoaded(true);
      if (!res) return;

      setProducts(res.data);
    });
  };

  useEffect(() => {
    fetchAllProductsFromWishlist();
  }, []);

  return (
    <div
      className={`${styles.container} ${
        isMobileView ? styles.mobileContainer : ""
      }`}
    >
      <div className={styles.heading}>Your Wishlist</div>

      <div className={styles.body}>
        {!dataLoaded ? (
          <Spinner />
        ) : products.length > 0 ? (
          products.map((item) => (
            <ProductCard
              mobileView={isMobileView}
              key={item._id}
              product={item}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <p>You do not have any product in wishlist</p>
            <Link to="/product" className="styled-link">
              View Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
