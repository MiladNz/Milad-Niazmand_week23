import * as yup from "yup";

const loginSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .min(3, "نام کاربری باید 3 کاراکتر یا بیشتر باشد")
      .required("نام کاربری الزامی است"),
    password: yup
      .string()
      .min(3, "رمز عبور باید 4 کاراکتر یا بیشتر باشد")
      .required("رمز عبور الزامی است"),
  })
  .required();

export default loginSchema;
