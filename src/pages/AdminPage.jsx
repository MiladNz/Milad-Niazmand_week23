import ProductTable from "../components/ProductTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";
import { useProductContext } from "../context/ProductContext";

function AdminPage() {
  const { search, setSearch, page, setPage } = useProductContext();

  return (
    // ! create style file
    <div style={{ maxWidth: "1140px" }}>
      <Searchbar />
      <ProductTable search={search} page={page} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default AdminPage;
