import React from "react";
import styles from "./Pagination.module.css";

function Pagination({ page, setPage, total, filteredProducts }) {
  const pages = Math.ceil(total / filteredProducts);
  return (
    <div className={styles.container}>
      <button>۱</button>
      <button>۲</button>
      <button>۳</button>
    </div>
  );
}

export default Pagination;
