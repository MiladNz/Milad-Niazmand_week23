import Image from "next/image";
import LoginForm from "../components/LoginForm";
import styles from "../styles/LoginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        {/* <img src="/Union.png" alt="logo" /> */}
        <Image
          src="/Union.png"
          alt="logo"
          width={100}
          height={100}
          style={{ marginBottom: "2rem" }}
        />
        <h2 style={{ marginBottom: "6rem" }}>فرم ورود</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
