import ProductTable from "../components/ProductTable";
import Searchbar from "../components/Searchbar";
import Pagination from "../components/Pagination";

function AdminPage() {
  return (
    // ! create style file
    <div style={{ maxWidth: "1140px" }}>
      <Searchbar />
      <ProductTable />
      <Pagination />
    </div>
  );
}

export default AdminPage;
