import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Filter } from "react-feather";

import ProductCard from "./ProductCard/ProductCard";
import Paginate from "components/Paginate/Paginate";
import Filters from "./Filters/Filters";
import Spinner from "components/Spinner/Spinner";
import ModalMobile from "components/Modal/ModalMobile/ModalMobile";

import { getAllProducts } from "api/user/product";

import styles from "./AllProducts.module.scss";

function AllProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef();

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    refSubCategory: "",
  });
  const [fetchingMoreProducts, setFetchingMoreProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const isMobileView = useSelector((state) => state.isMobileView);

  const fetchAllProducts = (givenFilters = filters, page = 1) => {
    getAllProducts(givenFilters, page).then((res) => {
      setProductsLoaded(true);
      if (!res) return;
      const products = res.data?.products;
      if (page === 1) {
        setProducts(products?.data);
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
      } else {
        setProducts((prev) => [...prev, ...products.data]);
      }
      setFetchingMoreProducts(false);
      setTotalProducts(products?.total);
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
      tempFilters.selectedCategory = { value: id, label: name };
      replaceCategoryOnUrl(id, name);
    }

    setFilters(tempFilters);
    setProductsLoaded(false);
    fetchAllProducts(tempFilters);
  };

  const handleFiltersSubmission = (appliedFilters, isReset) => {
    setProductsLoaded(false);
    let tempFilters;
    if (isReset) tempFilters = {};
    else
      tempFilters = {
        ...filters,
        ...appliedFilters,
        refSubCategory: appliedFilters?.refCategory
          ? filters.refSubCategory
          : "",
      };
    setFilters(tempFilters);
    fetchAllProducts(tempFilters);
    setCurrentPage(1);
  };

  const handleFetchMoreProducts = () => {
    let totalProducts, currentPage;
    setTotalProducts((prev) => {
      totalProducts = prev;
      return prev;
    });
    setCurrentPage((prev) => {
      currentPage = prev;
      return prev;
    });
    const totalPages = parseInt(totalProducts / 20) + 1;

    if (currentPage < totalPages) {
      setFetchingMoreProducts(true);
      fetchAllProducts(filters, currentPage + 1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const getFiltersFromUrl = () => {
    const queryParams = new URLSearchParams(location?.search);
    const refCategory = queryParams.get("refCategory") || "";
    const sortBy = queryParams.get("sortBy") || "";
    const search = queryParams.get("search") || "";
    const minimumPrice = queryParams.get("minimumPrice")
      ? parseInt(queryParams.get("minimumPrice"))
      : "";
    const maximumPrice = queryParams.get("maximumPrice")
      ? parseInt(queryParams.get("maximumPrice"))
      : "";
    let selectedCategory;
    try {
      selectedCategory = JSON.parse(queryParams.get("selectedCategory")) || "";
    } catch (err) {
      selectedCategory = "";
    }
    let selectedSortBy;
    try {
      selectedSortBy = JSON.parse(queryParams.get("selectedSortBy")) || "";
    } catch (err) {
      selectedSortBy = "";
    }

    const tempFilters = {
      search,
      refCategory,
      sortBy,
      minimumPrice,
      maximumPrice,
      selectedSortBy,
      selectedCategory,
    };

    setFilters(tempFilters);
    handleFiltersSubmission(tempFilters);
  };

  const isFiltersEmpty = () => {
    const tempFilters = { ...filters };
    const keys = Object.keys(tempFilters);
    if (keys.length === 0) return true;

    let output = true;
    keys.forEach((item) =>
      item !== "search" && tempFilters[item] ? (output = false) : ""
    );
    return output;
  };

  const handleProductSearch = () => {
    let query = searchInputRef?.current?.value;

    if (!query || !query.trim()) query = "";

    const tempFilters = {
      ...filters,
      search: query,
    };
    setFilters(tempFilters);
    handleFiltersSubmission(tempFilters);
  };

  useEffect(() => {
    getFiltersFromUrl();
    if (currentPage < 1) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const secondaryFiltersDiv = (
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
  );

  return (
    <div
      className={`${styles.container} ${
        isMobileView ? styles.mobileContainer : ""
      }`}
    >
      {!isMobileView && (
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <Filters onApply={handleFiltersSubmission} filters={filters} />
          </div>
        </div>
      )}
      {filtersOpen && (
        <ModalMobile onClose={() => setFiltersOpen(false)}>
          <Filters
            onClose={() => setFiltersOpen(false)}
            onApply={handleFiltersSubmission}
            filters={filters}
            mobileView
          />
        </ModalMobile>
      )}
      <div className={styles.right}>
        {isMobileView && (
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <form
                className={styles.search}
                onSubmit={(event) => {
                  event.preventDefault();
                  handleProductSearch();
                }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  className="basic-input"
                  placeholder="Search Store"
                />
                <Search onClick={handleProductSearch} />
              </form>
              <div className={styles.filterIcon}>
                <Filter onClick={() => setFiltersOpen(true)} />
                {isFiltersEmpty() ? "" : <div className={styles.dot} />}
              </div>
            </div>
            {secondaryFiltersDiv}
          </div>
        )}

        {!isMobileView && secondaryFiltersDiv}

        {productsLoaded ? (
          <div className={styles.productsContainer}>
            <p className={styles.title}>Products ({totalProducts})</p>
            <Paginate onEnd={handleFetchMoreProducts}>
              <div className={styles.products}>
                {!products.length ? (
                  <p>Oops no Products found with selected filter</p>
                ) : (
                  products.map((item) => (
                    <ProductCard
                      key={item?._id}
                      product={item}
                      mobileView={isMobileView}
                    />
                  ))
                )}
              </div>
            </Paginate>
            {fetchingMoreProducts && <Spinner />}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default AllProducts;
