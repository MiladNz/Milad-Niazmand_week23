import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "../services/authService";
import styles from "./ProductTable.module.css";
import { AiOutlineProduct } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "./Modal";

function ProductTable() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("محصول مورد نظر با موفقیت حذف شد");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("خطایی در حذف محصول رخ داد");
    },
  });

  const confirmHandler = () => {
    deleteMutation.mutate(selectedProduct);
    setShowModal(false);
  };

  const cancelHandler = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

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
          {data.data.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.id.split("-").pop()}</td>
              <td className={styles.btns}>
                <FiEdit className={styles.editBtn} />
                <FiTrash2
                  className={styles.delBtn}
                  onClick={() => {
                    setSelectedProduct(product.id);
                    setShowModal(true);
                    // deleteHandler(product.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal confirmHandler={confirmHandler} cancelHandler={cancelHandler} />
      )}
    </div>
  );
}

export default ProductTable;
