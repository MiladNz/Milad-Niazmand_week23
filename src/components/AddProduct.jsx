import { useForm } from "react-hook-form";
import styles from "./AddProduct.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import newProductSchema from "../schema/newProductSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addProduct } from "../services/authService";
import { v4 as uuidv4 } from "uuid";

function AddProduct({ setShowAddModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newProductSchema) });

  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("کالای جدید با موفقیت اضافه شد");
      queryClient.invalidateQueries(["products"]);
      setShowAddModal(false);
    },
    onError: () => {
      toast.error("خطایی رخ داد");
    },
  });

  const addProductHandler = (data) => {
    const productWithId = {
      id: uuidv4(),
      ...data,
    };
    addProductMutation.mutate(productWithId);
  };

  const cancelHandler = () => {
    setShowAddModal(false);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>ایجاد محصول جدید</h2>
        <form
          onSubmit={handleSubmit(addProductHandler)}
          className={styles.form}>
          <label htmlFor="name">نام کالا</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="نام کالا"
          />
          <p className={styles.error}>{errors.name?.message || " "}</p>
          <label htmlFor="quantity">تعداد موجودی</label>
          <input
            type="number"
            id="quantity"
            {...register("quantity")}
            placeholder="تعداد"
          />
          <p className={styles.error}>{errors.quantity?.message || " "}</p>
          <label htmlFor="price">قیمت</label>
          <input
            type="number"
            id="price"
            {...register("price")}
            placeholder="قیمت"
          />
          <p className={styles.error}>{errors.price?.message || " "}</p>
          <div className={styles.buttons}>
            <button type="submit">ایجاد</button>
            <button type="button" onClick={cancelHandler}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
