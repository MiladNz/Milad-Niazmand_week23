import RegisterForm from "../components/RegisterForm";
import styles from "./LoginPage.module.css";

function RegisterPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <img src="/Union.png" alt="logo" />
        <h2>فرم ثبت نام</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
