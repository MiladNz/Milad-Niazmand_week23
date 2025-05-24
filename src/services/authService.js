import dataApi from "./dataApi";

const loginUser = async (data) => {
  const response = await dataApi.post("/auth/login", data);
  return response.data;
};

const registerUser = async (data) => {
  const response = await dataApi.post("/auth/register", data);
  return response.data;
};

const getProducts = async ({ page = 1, limit = 10, search = "" }) => {
  try {
    const response = await dataApi.get("/products", {
      params: {
        page,
        limit,
        name: search,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return { data: [], totalProducts: 0 };
    }
    throw error;
  }
};

const deleteProduct = async (id) => {
  const response = await dataApi.delete(`/products/${id}`);
  return response.data;
};

const addProduct = async (data) => {
  const response = await dataApi.post("/products", data);
  return response.data;
};

const updateProduct = async ({ id, data }) => {
  const response = await dataApi.put(`/products/${id}`, data);
  return response.data;
};

export {
  loginUser,
  registerUser,
  getProducts,
  deleteProduct,
  addProduct,
  updateProduct,
};
