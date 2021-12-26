import React, { useEffect, useState } from "react";

import ProductCard from "./ProductCard/ProductCard";
import Filters from "./Filters/Filters";

import { getAllProducts } from "api/user/product";

import styles from "./AllProducts.module.scss";

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((res) => {
      if (!res) return;
      setProducts(res.data?.products?.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <Filters />
        </div>
      </div>
      <div className={styles.right}>
        {products.map((item) => (
          <ProductCard key={item?._id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
