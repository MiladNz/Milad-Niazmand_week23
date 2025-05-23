import Image from "next/image";
import RegisterForm from "../components/RegisterForm";
import styles from "./LoginPage.module.css";

function RegisterPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Image
          src="/Union.png"
          alt="logo"
          width={100}
          height={100}
          style={{ marginBottom: "2rem" }}
        />
        <h2>فرم ثبت نام</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
