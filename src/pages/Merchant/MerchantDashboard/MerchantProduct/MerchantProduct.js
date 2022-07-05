import React, { useState, useRef } from "react";
import { Search, ChevronDown, ChevronUp, Edit2, Trash } from "react-feather";

import Button from "components/Button/Button";
import AddProductModal from "../MerchantProduct/AddProductModal/AddProductModal";
import TopSellingProduct from "./TopSellingProduct/TopSellingProduct";

import styles from "./MerchantProduct.module.scss";

function MerchantProduct() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [isSortDropdown, setIsSortDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All Products");

  const searchInputRef = useRef();

  const userCategories = [
    {
      catergory: "vegetables",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
    {
      catergory: "milk and dairy",
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
    {
      catergory: "fruits",
      img_src:
        "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/categories%2F3-2-vegetable-transparent.png?alt=media&token=c52f835b-d095-4c71-9b7f-5d23d55fe1f7",
    },
  ];

  const allProducts = [
    {
      productName: "Tomato",
      catergory: "Vegitables",
      price: "30",
      selling_quantity: "1",
      selling_unit: "kg",
      stock_Available: "100",
      stock_available_In: "kg",
    },
    {
      productName: "Tomato",
      catergory: "Vegitables",
      price: "30",
      selling_quantity: "1",
      selling_unit: "kg",
      stock_Available: "100",
      stock_available_In: "kg",
    },
    {
      productName: "Tomato",
      catergory: "Vegitables",
      price: "30",
      selling_quantity: "1",
      selling_unit: "kg",
      stock_Available: "100",
      stock_available_In: "kg",
    },
    {
      productName: "Tomato",
      catergory: "Vegitables",
      price: "30",
      selling_quantity: "1",
      selling_unit: "kg",
      stock_Available: "100",
      stock_available_In: "kg",
    },
    {
      productName: "Ginger",
      catergory: "Vegitables",
      price: "15",
      selling_quantity: "250",
      selling_unit: "g",
      stock_Available: "10",
      stock_available_In: "kg",
    },
    {
      productName: "Mango",
      catergory: "Fruits",
      price: "25",
      selling_quantity: "1",
      selling_unit: "kg",
      stock_Available: "50",
      stock_available_In: "kg",
    },
    {
      productName: "milk",
      catergory: "dairy",
      price: "30",
      selling_quantity: "500",
      selling_unit: "mL",
      stock_Available: "15",
      stock_available_In: "litre",
    },
  ];

  const orders = [
    {
      productName: "tomato",
      quantity: "1",
      unit: "kg",
      price: "100",
      status: "delivered",
    },
    {
      productName: "apple",
      quantity: "1",
      unit: "kg",
      price: "100",
      status: "pending",
    },
    {
      productName: "Tea",
      quantity: "1",
      unit: "packet",
      price: "100",
      status: "delivered",
    },
    {
      productName: "tomato",
      quantity: "1",
      unit: "kg",
      price: "100",
      status: "cancelled",
    },
  ];

  const topSelling = [
    {
      img_src:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZydWl0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      productName: "Strawberry",
      price: "100",
      selling_quantity: "1",
      unit: "kg",
    },
    {
      img_src:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZydWl0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      productName: "Strawberry",
      price: "100",
      selling_quantity: "1",
      unit: "kg",
    },
    {
      img_src:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZydWl0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      productName: "Strawberry",
      price: "100",
      selling_quantity: "1",
      unit: "kg",
    },
    {
      img_src:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZydWl0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      productName: "Strawberry",
      price: "100",
      selling_quantity: "1",
      unit: "kg",
    },
    {
      img_src:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZydWl0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      productName: "Strawberry",
      price: "100",
      selling_quantity: "1",
      unit: "kg",
    },
    {
      img_src:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZydWl0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      productName: "Strawberry",
      price: "100",
      selling_quantity: "1",
      unit: "kg",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.firstChild}>
          <div className={styles.firstChild_header}>
            <h3>Categories</h3>
          </div>
          <div className={styles.categoriesContainer}>
            <div className={styles.categories}>
              {userCategories.map((catergory, i) => (
                <div className={styles.category_card} key={i}>
                  <div className={styles.category_image}>
                    <img src={catergory.img_src} alt="category" />
                  </div>
                  <p>{catergory.catergory}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.secondChild}>
          <div className={styles.secondChild_header}>
            <div className={styles.secondChild_header_left}>
              <p
                className={
                  selectedTab === "All Products" ? styles.activeTab : ""
                }
                onClick={(e) => setSelectedTab(e.target.innerHTML)}
              >
                All Products
              </p>
              <p
                className={selectedTab === "Orders" ? styles.activeTab : ""}
                onClick={(e) => setSelectedTab(e.target.innerHTML)}
              >
                Orders
              </p>
            </div>
            <div className={styles.secondChild_header_right}>
              <form
                className={styles.searchBox}
                onSubmit={(event) => {
                  event.preventDefault();
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
              <div className={styles.sortByBtn}>
                <span onClick={() => setIsSortDropdown(!isSortDropdown)}>
                  Sort by
                  {isSortDropdown ? <ChevronUp /> : <ChevronDown />}
                </span>
              </div>
              <Button onClick={() => setShowProductModal((prev) => !prev)}>
                Add Product
              </Button>
            </div>
          </div>
          <div className={styles.userProductsAndOrdersSlider}>
            {selectedTab === "All Products" ? (
              <div className={styles.allProductsSection}>
                <ul>
                  <li className={styles.productsHeader}>
                    <span>Product</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span></span>
                    <span></span>
                  </li>
                  {allProducts.map((product, i) => (
                    <li className={styles.productDetails} key={i}>
                      <span>{product.productName}</span>
                      <span>{product.catergory}</span>
                      <span>
                        &#8377;{product.price}
                        <span className={styles.perUnit}>
                          (
                          {`${product.selling_quantity} ${product.selling_unit}`}
                          )
                        </span>
                      </span>
                      <span>{`${product.stock_Available} ${product.stock_available_In}`}</span>
                      <span className={styles.icons}>
                        <span>
                          <Edit2 />
                        </span>
                        <span>
                          <Trash />
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={styles.ordersSection}>
                <ul>
                  <li className={styles.orderSectionHeader}>
                    <span>Ordered Placed({orders.length})</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Status</span>
                  </li>
                  <div className={styles.ordersSectionBody}>
                    {orders.map((order, i) => (
                      <li className={styles.productDetails} key={i}>
                        <span>{order.productName}</span>
                        <span>{`${order.quantity} ${order.unit}`}</span>
                        <span>&#8377; {order.price}</span>
                        <span>
                          <span className={`${styles[order.status]}`}>
                            {order.status}
                          </span>
                        </span>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.topSellingSectionContainer}>
        <div className={styles.topSellingSection}>
          <h3>Top Selling Products</h3>
          <div className={styles.productList}>
            {topSelling.map((product, i) => (
              <TopSellingProduct key={i} productDetails={product} />
            ))}
          </div>
        </div>
      </div>
      {showProductModal && (
        <AddProductModal onClose={() => setShowProductModal(false)} />
      )}
    </>
  );
}

export default MerchantProduct;
