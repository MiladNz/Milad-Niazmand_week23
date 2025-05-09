import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginSchema from "../schema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("ورود با موفقیت انجام شد", { className: styles.toastify });
    },
    onError: () => {
      toast.error("ورود ناموفق بود . دوباره تلاش کنید", {
        className: styles.toastify,
      });
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
      {errors.username && <p>{errors.username.message}</p>}
      <input type="password" {...register("password")} placeholder="رمز عبور" />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "در حال ورود ..." : "ورود"}
      </button>
    </form>
  );
}

export default LoginForm;
