import * as yup from "yup";

const registerSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .min(3, "نام کاربری باید ۳ کاراکتر یا بیشتر باشد")
      .required("نام کاربری الزامی است"),
    password: yup
      .string()
      .min(4, "رمز عبور باید ۴ کاراکتر یا بیشتر باشد")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
        "رمز عبور باید شامل حروف و عدد باشد"
      )
      .required("رمز عبور الزامی است"),
    repeatPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "تکرار رمز عبور با رمز عبور مطابقت ندارد"
      )
      .required("تکرار رمز عبور الزامی است"),
  })
  .required();

export default registerSchema;
