import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "react-feather";

import Spinner from "components/Spinner/Spinner";

import { getAllCategories } from "api/user/category";

import styles from "./ExploreMobile.module.scss";

function ExploreMobile() {
  const [categories, setCategories] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchAllCategories = () => {
    getAllCategories().then((res) => {
      setDataLoaded(true);
      if (!res) return;
      setCategories(res.data);
    });
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Find Products</p>

      <form className={styles.search}>
        <input type="text" className="basic-input" placeholder="Search Store" />
        <Search />
      </form>

      <div className={styles.categories}>
        {!dataLoaded ? (
          <Spinner />
        ) : categories?.length === 0 ? (
          <p>No categories found</p>
        ) : (
          categories.map((item, index) => (
            <Link
              key={item._id}
              to={`/product?refCategory=${
                item?._id
              }&selectedCategory=${JSON.stringify({
                value: item._id,
                label: item.name,
              })}`}
            >
              <div
                className={`${styles.category} ${
                  index % 4 === 0
                    ? styles.orange
                    : index % 3 === 0
                    ? styles.red
                    : ""
                }`}
              >
                <img src={item.url} alt={item.name} />
                <p>{item.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ExploreMobile;
