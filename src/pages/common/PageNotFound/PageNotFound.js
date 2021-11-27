import React from "react";

import notFound from "assets/images/page-not-found.svg";

import styles from "./PageNotFound.module.scss";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <img src={notFound} alt="Not Found" />
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
}

export default PageNotFound;
