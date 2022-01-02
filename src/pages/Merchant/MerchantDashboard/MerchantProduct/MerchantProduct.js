import React, { useState, useRef } from "react";
import { Search } from "react-feather";

import Button from "components/Button/Button";
import AddProductModal from "../MerchantProduct/AddProductModal/AddProductModal";
import Dropdown from "components/Dropdown/Dropdown";

import styles from "./MerchantProduct.module.scss";

function MerchantProduct() {
  const [showProductModal, setShowProductModal] = useState(false);

  const searchInputRef = useRef();

  const userCategories = [
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.firstChild}>
          <div className={styles.firstChild_header}>
            <h3>Categories</h3>
            <Button onClick={() => setShowProductModal((prev) => !prev)}>
              Add Product
            </Button>
          </div>
          <div className={styles.categories}>
            {userCategories.map((catergory) => (
              <div className={styles.category_card}>
                <div className={styles.category_image}>
                  <img src={catergory.img_src} />
                </div>
                <p>{catergory.catergory}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.secondChild}>
          <div className={styles.secondChild_header}>
            <div className={styles.productsAndOrders}>
              <p>All Products</p>
              <p>Orders</p>
              <p>Delivered</p>
              <p>Canceled</p>
            </div>
            <form
              className={styles.searchBox}
              onSubmit={(event) => {
                event.preventDefault();
                // handleSearch();
              }}
            >
              <input
                ref={searchInputRef}
                type="text"
                className="basic-input"
                placeholder="Search product"
              />
              <div className={styles.searchIcon}>
                <Search />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.topSellingSectionContainer}>
        <div className={styles.topSellingSection}>
          <h3>Top Selling Products</h3>
        </div>
      </div>
      {showProductModal && (
        <AddProductModal onClose={() => setShowProductModal(false)} />
      )}
    </>
  );
}

export default MerchantProduct;
