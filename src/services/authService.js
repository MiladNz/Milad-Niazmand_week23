import dataApi from "./dataApi";
import { setCookie, getCookie } from "../utils/cookie";

const loginUser = async (data) => {
  const response = await dataApi.post("/auth/login", data);
  const token = response.data.token;
  setCookie("token", token);
  return response.data;
};

const registerUser = async (data) => {
  const response = await dataApi.post("/auth/register", data);
  return response.data;
};

const getProducts = async ({ page = 1, limit = 10, search = "" }) => {
  try {
    const token = getCookie("token");
    const response = await dataApi.get("/products", {
      params: {
        page,
        limit,
        name: search,
      },
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: `Bearer ${token}`,
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
  const token = getCookie("token");

  const response = await dataApi.delete(`/products/${id}`, {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addProduct = async (data) => {
  const token = getCookie("token");

  const response = await dataApi.post("/products", data, {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateProduct = async ({ id, data }) => {
  const token = getCookie("token");

  const response = await dataApi.put(`/products/${id}`, data, {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      Authorization: `Bearer ${token}`,
    },
  });
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
