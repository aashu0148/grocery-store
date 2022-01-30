import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "react-feather";

import Spinner from "components/Spinner/Spinner";

import { getAllCategories } from "api/user/category";

import styles from "./ExploreMobile.module.scss";

function ExploreMobile() {
  const inputRef = useRef();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchAllCategories = () => {
    getAllCategories().then((res) => {
      setDataLoaded(true);
      if (!res) return;
      setCategories(res.data);
    });
  };

  const handleSearch = () => {
    const query = inputRef?.current?.value;

    if (!query || !query.trim()) return;

    navigate(`/product?search=${query.trim()}`);
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Find Products</p>

      <form
        className={styles.search}
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          ref={inputRef}
          className="basic-input"
          placeholder="Search Store"
        />
        <Search onClick={handleSearch} />
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
