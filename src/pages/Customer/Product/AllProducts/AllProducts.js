import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ProductCard from "./ProductCard/ProductCard";
import Filters from "./Filters/Filters";
import Spinner from "components/Spinner/Spinner";

import { getAllProducts } from "api/user/product";

import styles from "./AllProducts.module.scss";

function AllProducts() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    refSubCategory: "",
  });

  const fetchAllProducts = (filters) => {
    getAllProducts(filters).then((res) => {
      setProductsLoaded(true);
      if (!res) return;
      setProducts(res.data?.products?.data);
      setTotalProducts(res.data?.products?.total);
      setFilteredCategories(
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

  const replaceCategoryOnUrl = (refCategory, name) => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.set("refCategory", refCategory);
    queryParams.set(
      "selectedCategory",
      JSON.stringify({ value: refCategory, label: name })
    );

    navigate({
      search: queryParams.toString(),
    });
  };

  const handleSubCategoryChange = (id, isSubCategory, name) => {
    const tempFilters = { ...filters };
    if (isSubCategory) {
      if (tempFilters.refSubCategory === id) tempFilters.refSubCategory = "";
      else tempFilters.refSubCategory = id;
    } else {
      tempFilters.refCategory = id;
      tempFilters.refSubCategory = "";
      replaceCategoryOnUrl(id, name);
    }

    setFilters(tempFilters);
    setProductsLoaded(false);
    fetchAllProducts(tempFilters);
  };

  const handleFiltersSubmission = (appliedFilters) => {
    setProductsLoaded(false);
    const tempFilters = {
      ...appliedFilters,
      refSubCategory: filters.refSubCategory,
    };
    setFilters(tempFilters);
    fetchAllProducts(tempFilters);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftInner}>
          <Filters onApply={handleFiltersSubmission} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.filters}>
          <div className={styles.filtersInner}>
            {filteredCategories?.map((item, index) => (
              <React.Fragment key={item._id}>
                <p
                  className={
                    item?.isSubcategory && item._id === filters?.refSubCategory
                      ? styles.active
                      : ""
                  }
                  onClick={() =>
                    handleSubCategoryChange(
                      item._id,
                      item?.isSubcategory,
                      item.name
                    )
                  }
                >
                  {item.name} ({item.total})
                </p>
                {index !== filteredCategories?.length - 1 && (
                  <span className={styles.bar} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {productsLoaded ? (
          <div className={styles.productsContainer}>
            <p className={styles.title}>Products ({totalProducts})</p>
            <div className={styles.products}>
              {!products.length ? (
                <p>Oops no Products found with selected filter</p>
              ) : (
                products.map((item) => (
                  <ProductCard key={item?._id} product={item} />
                ))
              )}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default AllProducts;
