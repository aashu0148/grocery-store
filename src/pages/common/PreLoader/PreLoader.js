import React from "react";

import styles from "./PreLoader.module.scss";

function PreLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default PreLoader;
