import axios from "axios";
import { products_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";
// import { config } from "../../utils/config";

const getAllProducts = async () => {
  const response = await axios.get(`${products_base_url}/`, getConfig());
  return response.data;
};

const deleteProduct = async (id)=>{
  const response = await axios.delete(`${products_base_url}/${id}` , getConfig())
  return response.data
}

const createProduct = async(product)=>{
  const response = await axios.post(`${products_base_url}/` ,{...product}, getConfig())
  return response.data
}

const getProduct = async(id)=>{
  console.log(id)
  const response = await axios.get(`${products_base_url}/${id}` ,getConfig())
  console.log(response.data)
  return response.data
}
const productsService = {
  getAllProducts,
  deleteProduct,
  createProduct,
  getProduct
};

export default productsService;
