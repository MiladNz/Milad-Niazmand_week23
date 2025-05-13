import { CiLogout, CiSearch } from "react-icons/ci";
import styles from "./Searchbar.module.css";
import { jwtDecode } from "jwt-decode";
import { useProductContext } from "../context/ProductContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useEffect } from "react";

function Searchbar({ onSearchChange }) {
  const { setSearch } = useProductContext();
  const [searchInput, setSearchInput] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const savedToken = localStorage.getItem("token");

  const logoutNavigate = useNavigate();

  const debounceSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setSearch(debounceSearch);
  }, [debounceSearch, setSearch]);

  let username = "";

  if (savedToken) {
    const decoded = jwtDecode(savedToken);
    username = decoded.username;
  }

  const inputHandler = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value);
    // setSearchInput(e.target.value);
  };

  const dropdownHandler = () => {
    setShowProfile(!showProfile);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setShowProfile(false);
    logoutNavigate("/");
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
      <div className={styles.profile} onClick={dropdownHandler}>
        <img src="/user.png" alt="user-image" />
        <div className={styles.profileInfo}>
          <p>{username ? username : ""}</p>
          <p>مدیر</p>
        </div>
        {showProfile && (
          <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            <div className={styles.logout} onClick={logoutHandler}>
              <CiLogout className={styles.icon} />
              <p>خروج</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
