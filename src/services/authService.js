import dataApi from "./dataApi";

const loginUser = async (data) => {
  const response = await dataApi.post("/auth/login", data);
  return response.data;
};

const registerUser = async (data) => {
  const response = await dataApi.post("/auth/register", data);
  return response.data;
};

const getProducts = async () => {
  const response = await dataApi.get("/products", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await dataApi.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export { loginUser, registerUser, getProducts, deleteProduct };
