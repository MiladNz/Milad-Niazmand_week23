import { useState } from "react";
import ProductTable from "../components/ProductTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";

function AdminPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  return (
    // ! create style file
    <div style={{ maxWidth: "1140px" }}>
      <Searchbar searchHandler={(value) => setSearch(value)} />
      <ProductTable search={search} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default AdminPage;
