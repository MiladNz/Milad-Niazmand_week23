import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "../services/authService";
import styles from "./ProductTable.module.css";
import { AiOutlineProduct } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ProductForm from "./ProductForm";
import { useProductContext } from "../context/ProductContext";
import { ThreeDots } from "react-loader-spinner";
import { MdErrorOutline } from "react-icons/md";

function ProductTable({ search }) {
  const { page, limit, setTotal } = useProductContext();
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => getProducts({ page, limit, search }),
    keepPreviousData: true,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (product) => deleteProduct(product.id),
    onSuccess: (_, product) => {
      toast.success(`کالای ${product.name} با موفقیت حذف شد`);
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

  useEffect(() => {
    if (data?.totalProducts) {
      setTotal(data.totalProducts);
    }
  }, [data, setTotal]);

  if (isError && data)
    return (
      <div className={styles.errorMsg}>
        <span>
          <MdErrorOutline />
        </span>
        <p>بروز خطا در دریافت لیست محصولات </p>
      </div>
    );

  if (isLoading)
    return (
      <div className={styles.loader}>
        <ThreeDots color="#55a3f0" />
      </div>
    );

  const paginationProducts = data?.data || [];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>
            <AiOutlineProduct />
          </span>
          <h2>مدیریت کالا</h2>
        </div>
        <button onClick={() => setShowAddModal(true)}>افزودن محصول</button>
        {showAddModal && (
          <ProductForm mode="add" onClose={() => setShowAddModal(false)} />
        )}
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
          {paginationProducts.length > 0 ? (
            paginationProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.id.split("-").pop()}</td>
                <td className={styles.btns}>
                  <FiEdit
                    className={styles.editBtn}
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowEditModal(true);
                    }}
                  />
                  <FiTrash2
                    className={styles.delBtn}
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowModal(true);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                کالایی با این مشخصات پیدا نشد
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <Modal confirmHandler={confirmHandler} cancelHandler={cancelHandler} />
      )}
      {showEditModal && selectedProduct && (
        <ProductForm
          mode="edit"
          onClose={() => setShowEditModal(false)}
          initialData={selectedProduct}
        />
      )}
    </div>
  );
}

export default ProductTable;
