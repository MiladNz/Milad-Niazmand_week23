import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import registerSchema from "../schema/registerSchema";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    },
    onError: () => {
      toast.error("ثبت نام ناموفق بود");
    },
  });

  const registerHandler = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(registerHandler)}>
      <input type="text" {...register("username")} placeholder="نام کاربری" />
      {errors.username && <p>{errors.username.message}</p>}
      <input type="password" {...register("password")} placeholder="رمز عبور" />
      {errors.password && <p>{errors.password.message}</p>}
      <input
        type="password"
        {...register("repeatPassword")}
        placeholder="تکرار رمز عبور"
      />
      {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "در حال ثبت نام ..." : "ثبت نام"}
      </button>
      <p>
        <Link to="/" className={styles.registerLink}>
          حساب کاربری دارید؟
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
