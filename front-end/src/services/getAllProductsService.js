import http from "./httpService";

export const getAllProducts = () => {
  return http.get("/product");
};