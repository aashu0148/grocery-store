import React from "react";

import MainCarousel from "components/Carousel/MainCarousel/MainCarousel";
import CategorySection from "components/CategorySection/CategorySection";

import styles from "./HomePage.module.scss";
import ItemsCarousel from "components/Carousel/ItemsCarousel/ItemsCarousel";

function HomePage() {
  const slides = [
    {
      id: Math.floor(Math.random() * 458),
      image:
        "https://www.bigbasket.com/media/uploads/banner_images/hp_kgp_m_H_Knowornever_460_251121.jpg",
      icon: "https://img.icons8.com/color/2x/kitchen.png",
      title: "Home & kitchen",
    },
    {
      id: Math.floor(Math.random() * 458),
      image:
        "https://www.bigbasket.com/media/uploads/banner_images/hp_FreshoDays_460_071221.jpg",
      icon: "https://img.icons8.com/color/2x/group-of-fruits.png",
      title: "fruits & veggies",
    },
    {
      id: Math.floor(Math.random() * 458),
      image:
        "https://www.bigbasket.com/media/uploads/banner_images/hp_cmc_m_Xmasstore_460_211221.jpg",
      icon: "https://img.icons8.com/external-justicon-flat-justicon/2x/external-santa-claus-christmas-avatar-justicon-flat-justicon-1.png",
      title: "Christmas special",
    },
    {
      id: Math.floor(Math.random() * 458),
      image:
        "https://www.bigbasket.com/media/uploads/banner_images/hp_cmc_m_bbroyal_460_251121.jpg",
      icon: "https://cdn-icons-png.flaticon.com/128/4090/4090434.png",
      title: "Best",
    },
  ];

  return (
    <div className={styles.homePage}>
      <MainCarousel slides={slides} />
      <CategorySection />
      <div className={styles.itemSection}>
        <h3>Top selling items</h3>
        <ItemsCarousel />
      </div>
    </div>
  );
}

export default HomePage;
