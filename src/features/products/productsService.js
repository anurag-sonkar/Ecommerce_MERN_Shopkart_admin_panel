import axios from "axios";
import { products_base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getAllProducts = async () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  let token;
  if (user) {
    token = user.result.token;
  }
  const response = await axios.get(`${products_base_url}/`, config);
console.log(response.data.products)
  return response.data.products;
};

const productsService = {
  getAllProducts,
};

export default productsService;
