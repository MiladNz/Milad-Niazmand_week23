import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import registerSchema from "../src/schema/registerSchema";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../src/services/authService";
import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./LoginForm.module.css";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  // const navigate = useNavigate();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("ثبت نام با موفقیت انجام شد");
      setTimeout(() => {
        // navigate("/");
        router.push("/login");
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
      <p className={styles.error}>{errors.username?.message || " "}</p>
      <input type="password" {...register("password")} placeholder="رمز عبور" />
      <p className={styles.error}>{errors.password?.message || " "}</p>
      <input
        type="password"
        {...register("repeatPassword")}
        placeholder="تکرار رمز عبور"
      />
      <p className={styles.error}>{errors.repeatPassword?.message || " "}</p>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "در حال ثبت نام ..." : "ثبت نام"}
      </button>
      <p>
        {/* <Link to="/" className={styles.registerLink}>
          حساب کاربری دارید؟
        </Link> */}
        <Link href="/login" className={styles.registerLink}>
          حساب کاربری دارید؟
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
