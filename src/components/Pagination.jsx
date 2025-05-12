import styles from "./Pagination.module.css";
import { useProductContext } from "../context/ProductContext";

function Pagination() {
  const { page, setPage, total, limitPerPage } = useProductContext();

  const pages = Math.ceil(total / limitPerPage);

  console.log("total:", total, "limit:", limitPerPage, "pages:", pages);

  return (
    <div className={styles.container}>
      {[...Array(pages).keys()].map((num) => (
        <button
          key={num}
          className={page === num + 1 ? styles.active : ""}
          onClick={() => setPage(num + 1)}>
          {num + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
