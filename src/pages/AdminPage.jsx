import ProductTable from "../components/ProductTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

function AdminPage() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  return (
    // ! create style file
    <div style={{ maxWidth: "1140px" }}>
      <Searchbar onSearchChange={(value) => setSearchInput(value)} />
      <ProductTable search={debouncedSearch} />
      <Pagination />
    </div>
  );
}

export default AdminPage;
