import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginSchema from "../src/schema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../src/services/authService";
import { toast } from "react-toastify";
import styles from "../styles/LoginForm.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { setCookie } from "../src/utils/cookie";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setCookie("token", data.token);
      toast.success("ورود با موفقیت انجام شد");
      setTimeout(() => {
        router.push("/dashboard");
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
        <Link href="/register" className={styles.registerLink}>
          ایجاد حساب کاربری
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
