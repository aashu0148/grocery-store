import React from "react";

import MainCarousel from "components/Carousel/MainCarousel/MainCarousel";
import Navbar from "components/Navbar/Navbar";

import styles from "./CategorySection.module.scss";

function CategorySection() {
  const slides = [
    {
      id: Math.floor(Math.random()),
      image:
        "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdyb2Nlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      icon: "https://media.istockphoto.com/photos/inflation-growth-of-food-sales-growth-of-market-basket-or-consumer-picture-id1315699311?b=1&k=20&m=1315699311&s=170667a&w=0&h=2ylL-XmYgjulHTMUvpblXESoNk-xenNuSAC2A4JfstQ=",
      title: "basic",
    },
    {
      id: Math.floor(Math.random()),
      image:
        "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdyb2Nlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      icon: "https://media.istockphoto.com/photos/inflation-growth-of-food-sales-growth-of-market-basket-or-consumer-picture-id1315699311?b=1&k=20&m=1315699311&s=170667a&w=0&h=2ylL-XmYgjulHTMUvpblXESoNk-xenNuSAC2A4JfstQ=",
      title: "basic",
    },
  ];

  return (
    <div className={styles.categories}>
      <Navbar />
      <MainCarousel slides={slides} />
    </div>
  );
}

export default CategorySection;
