import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginSchema from "../schema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("ورود با موفقیت انجام شد");
      setTimeout(() => {
        navigate("/admin");
      }, 2500);
    },
    onError: () => {
      toast.error("ورود ناموفق بود . دوباره تلاش کنید");
    },
  });

  const loginHandler = (inputs) => {
    mutation.mutate(inputs);
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit(loginHandler)}>
      <input type="text" {...register("username")} placeholder="نام کاربری" />
      <p className={styles.error}>{errors.username?.message || " "}</p>
      <input type="password" {...register("password")} placeholder="رمز عبور" />
      <p className={styles.error}>{errors.password?.message || " "}</p>
      <button
        type="submit"
        disabled={mutation.isPending}
        style={{ marginBottom: "2rem", marginTop: "2rem" }}>
        {mutation.isPending ? "در حال ورود ..." : "ورود"}
      </button>
      <p>
        <Link to="/register" className={styles.registerLink}>
          ایجاد حساب کاربری
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
