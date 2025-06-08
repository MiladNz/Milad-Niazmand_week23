import ProductTable from "../components/ProductTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import { useState } from "react";
import useDebounce from "../src/hooks/useDebounce";
import Footer from "../components/Footer";

function AdminPage({ initialProducts }) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  return (
    <div>
      <Searchbar onSearchChange={(value) => setSearchInput(value)} />
      <ProductTable
        search={debouncedSearch}
        initialProducts={initialProducts}
      />
      <Pagination />
      <Footer />
    </div>
  );
}

export default AdminPage;

export async function getServerSideProps(context) {
  const { req } = context;

  const token = req.cookies?.token || "";

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await fetch("http://localhost:3000/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return {
    props: {
      initialProducts: data,
    },
  };
}
