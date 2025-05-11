import { useForm } from "react-hook-form";
import styles from "./AddProduct.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import newProductSchema from "../schema/newProductSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addProduct } from "../services/authService";
import { v4 as uuidv4 } from "uuid";

function AddProduct({ setShowAddModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newProductSchema) });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("کالای جدید با موفقیت اضافه شد");
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
        <form onSubmit={handleSubmit(addProductHandler)}>
          <label htmlFor="name">نام کالا</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="نام کالا"
          />
          {errors.name && <p>{errors.name.message}</p>}
          <label htmlFor="quantity">تعداد موجودی</label>
          <input
            type="number"
            id="quantity"
            {...register("quantity")}
            placeholder="تعداد"
          />
          {errors.quantity && <p>{errors.quantity.message}</p>}
          <label htmlFor="price">قیمت</label>
          <input
            type="number"
            id="price"
            {...register("price")}
            placeholder="قیمت"
          />
          {errors.price && <p>{errors.price.message}</p>}
          <button type="submit">ایجاد</button>
          <button type="button" onClick={cancelHandler}>
            لغو
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
