import dataApi from "./dataApi";

const loginUser = async (data) => {
  const response = await dataApi.post("/auth/login", data);
  return response.data;
};
export { loginUser };
