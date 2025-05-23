import { useForm } from "react-hook-form";
import styles from "./ProductForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import newProductSchema from "../schema/newProductSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addProduct, updateProduct } from "../services/authService";
import { v4 as uuidv4 } from "uuid";

function ProductForm({ onClose, mode = "add", initialData = null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newProductSchema),
    defaultValues: initialData || {
      name: "",
      quantity: "",
      price: "",
    },
  });

  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: mode === "edit" ? updateProduct : addProduct,
    onSuccess: () => {
      toast.success(
        mode === "edit"
          ? "اطلاعات محصول با موفقیت ویرایش شد"
          : "محصول جدید با موفقیت اضافه شد"
      );
      queryClient.invalidateQueries(["products"]);
      onClose();
    },
    onError: () => {
      toast.error("خطایی رخ داد");
    },
  });

  const submitHandler = (data) => {
    const product = mode === "add" ? { ...data, id: uuidv4() } : data;
    if (mode === "add") productMutation.mutate(product);
    if (mode === "edit")
      productMutation.mutate({
        id: product.id,
        data: {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        },
      });
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>{mode === "edit" ? "ویرایش محصول" : "ایجاد محصول جدید"}</h2>
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
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
            <button type="submit">
              {mode === "edit" ? "ذخیره تغییرات" : "ایجاد"}
            </button>
            <button type="button" onClick={onClose}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
