import { useState } from "react";
import ProductTable from "../components/ProductTable";
import Searchbar from "../components/Searchbar";

function AdminPage() {
  const [search, setSearch] = useState("");

  return (
    // ! create style file
    <div style={{ maxWidth: "1140px" }}>
      <Searchbar searchHandler={(value) => setSearch(value)} />
      <ProductTable search={search} />
    </div>
  );
}

export default AdminPage;
