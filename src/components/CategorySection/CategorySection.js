import React, { useState, useEffect } from "react";

import CategoryCard from "./CategoryCard/CategoryCard";
import Spinner from "components/Spinner/Spinner";

import { getAllCategories } from "api/common";

import styles from "./CategorySection.module.scss";

function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  function fetchAllCategories() {
    getAllCategories().then((res) => {
      setDataLoaded(true);
      if (!res) return;
      setCategories(res.data);
    });
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <div className={styles.categorySection}>
      <h3>Categories</h3>
      <div className={styles.categories}>
        {!dataLoaded ? (
          <Spinner />
        ) : categories?.length === 0 ? (
          <p>No categories found</p>
        ) : (
          categories.map((item) => (
            <CategoryCard
              key={item._id}
              imageUrl={item.url}
              category={item.name}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CategorySection;
