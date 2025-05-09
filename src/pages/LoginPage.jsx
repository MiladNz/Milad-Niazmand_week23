import LoginForm from "../components/LoginForm";
import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <img src="/Union.png" alt="logo" />
        <h2 style={{ marginBottom: "6rem" }}>فرم ورود</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
