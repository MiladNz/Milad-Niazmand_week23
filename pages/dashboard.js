import ProductTable from "../components/ProductTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import { useState } from "react";
import useDebounce from "../src/hooks/useDebounce";
import Footer from "../components/Footer";

function AdminPage() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  return (
    <div>
      <Searchbar onSearchChange={(value) => setSearchInput(value)} />
      <ProductTable search={debouncedSearch} />
      <Pagination />
      <Footer />
    </div>
  );
}

export default AdminPage;
