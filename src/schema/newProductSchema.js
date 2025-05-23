import * as yup from "yup";

const newProductSchema = yup.object().shape({
  name: yup.string().required("نام کالا الزامی است"),
  price: yup
    .number()
    .typeError("قیمت باید یک عدد باشد")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(originalValue)
    )
    .positive("قیمت باید عددی مثبت باشد")
    .min(1, "قیمت باید حداقل ۱ باشد")
    .required("قیمت کالا الزامی است"),
  quantity: yup
    .number()
    .typeError("موجودی باید یک عدد باشد")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(originalValue)
    )
    .positive("موجودی باید عددی مثبت باشد")
    .min(1, "موجودی باید حداقل ۱ باشد")
    .required("موجودی کالا الزامی است"),
});

export default newProductSchema;
