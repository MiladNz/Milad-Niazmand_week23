import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginSchema from "../schema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";

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
      console.log("Login success", data);
    },
    onError: (error) => {
      console.error(
        "Login Error:",
        error.response?.data?.message || "مشکلی پیش آمد"
      );
    },
  });

  const loginHandler = (inputs) => {
    mutation.mutate(inputs);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(loginHandler)}>
        <input type="text" {...register("username")} placeholder="نام کاربری" />
        {errors.username && <p>{errors.username.message}</p>}
        <input type="text" {...register("password")} placeholder="رمز عبور" />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">ورود</button>
      </form>
    </div>
  );
}

export default LoginForm;
