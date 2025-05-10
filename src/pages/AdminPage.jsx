import ProductTable from "../components/ProductTable";
import Searchbar from "../components/Searchbar";

function AdminPage() {
  return (
    <div style={{ maxWidth: "1140px" }}>
      <Searchbar />
      <ProductTable />
    </div>
  );
}

export default AdminPage;
