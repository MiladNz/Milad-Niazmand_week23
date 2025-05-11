import { CiSearch } from "react-icons/ci";
import styles from "./Searchbar.module.css";
import { jwtDecode } from "jwt-decode";

function Searchbar({ searchHandler }) {
  const savedToken = localStorage.getItem("token");
  let username = "";

  if (savedToken) {
    const decoded = jwtDecode(savedToken);
    username = decoded.username;
  }

  const inputHandler = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <span>
          <CiSearch />
        </span>
        <input
          type="text"
          id="search"
          placeholder="جستجوی کالا"
          onChange={inputHandler}
        />
      </div>
      <div className={styles.profile}>
        <img src="/user.png" alt="user-image" />
        <div className={styles.profileInfo}>
          <p>{username ? username : ""}</p>
          <p>مدیر</p>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
