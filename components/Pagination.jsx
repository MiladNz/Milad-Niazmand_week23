import styles from "../styles/Pagination.module.css";
import { useProductContext } from "../src/context/ProductContext";

function Pagination() {
  const { page, setPage, total, limit } = useProductContext();

  const pages = Math.ceil(total / limit);

  return (
    <div className={styles.container}>
      {[...Array(pages).keys()].map((num) => (
        <button
          key={num}
          className={page === num + 1 ? styles.active : ""}
          onClick={() => setPage(num + 1)}>
          {(num + 1).toLocaleString("fa")}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
