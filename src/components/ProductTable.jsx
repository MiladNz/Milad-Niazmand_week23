import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/authService";
import styles from "./ProductTable.module.css";
import { AiOutlineProduct } from "react-icons/ai";

function ProductTable() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (isLoading) return <p>در حال بارگذاری ...</p>;
  if (isError) return <p>بروز خطا در دریافت لیست محصولات : {error.message}</p>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>
            <AiOutlineProduct />
          </span>
          <h2>مدیریت کالا</h2>
        </div>
        <button>افزودن محصول</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>aaa</td>
            <td>222</td>
            <td>443000</td>
            <td>324234234324</td>
            <td>+</td>
          </tr>
          <tr>
            <td>aaa</td>
            <td>222</td>
            <td>443000</td>
            <td>324234234324</td>
            <td>+</td>
          </tr>
          <tr>
            <td>aaa</td>
            <td>222</td>
            <td>443000</td>
            <td>324234234324</td>
            <td>+</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
