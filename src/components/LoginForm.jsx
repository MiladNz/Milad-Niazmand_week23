import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginSchema from "../schema/loginSchema";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const loginHandler = () => {};

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
