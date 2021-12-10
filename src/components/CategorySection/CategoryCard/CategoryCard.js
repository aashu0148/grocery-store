import React from "react";

import styles from "./CategoryCard.module.scss";

function CategoryCard(props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={props.imageUrl} alt="dummy" />
      </div>
      <p>{props.category}</p>
    </div>
  );
}

export default CategoryCard;
