import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [limitPerPage, setlimitPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  return (
    <ProductContext.Provider
      value={{
        page,
        setPage,
        limitPerPage,
        setlimitPerPage,
        search,
        setSearch,
        total,
        setTotal,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
