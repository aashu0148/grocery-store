import React, { useEffect, useState } from "react";

import ProductCard from "./ProductCard/ProductCard";
import Filters from "./Filters/Filters";
import Spinner from "components/Spinner/Spinner";

import { getAllProducts } from "api/user/product";

import styles from "./AllProducts.module.scss";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  const fetchAllProducts = () => {
    getAllProducts().then((res) => {
      setProductsLoaded(true);
      if (!res) return;
      setProducts(res.data?.products?.data);
      setCategoryFilters(
        res?.data?.categories?.map((item) =>
          item?.subCategory
            ? {
                _id: item?.subCategory?._id,
                name: item?.subCategory?.name,
                total: item?.total,
                isSubcategory: true,
              }
            : {
                _id: item?.category?._id,
                name: item?.category?.name,
                total: item?.total,
                isSubcategory: false,
              }
        )
      );
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <Filters />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.filters}>
          <div className={styles.filtersInner}>
            {categoryFilters?.map((item, index) => (
              <React.Fragment key={item._id}>
                <p>
                  {item.name} ({item.total})
                </p>
                {index !== categoryFilters?.length - 1 && (
                  <span className={styles.bar} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {productsLoaded ? (
          <div className={styles.productsContainer}>
            {products.map((item) => (
              <ProductCard key={item?._id} product={item} />
            ))}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default AllProducts;
