import axios from "axios";
import { products_base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getAllProducts = async () => {
  const response = await axios.get(`${products_base_url}/`, config);
  return response.data;
};

const deleteProduct = async (id)=>{
  const response = await axios.delete(`${products_base_url}/${id}` , config)
  return response.data
}

const createProduct = async(product)=>{
  console.log(product)
  const response = await axios.post(`${products_base_url}/` ,{...product}, config)
  console.log(response.data)
  return response.data
}

const productsService = {
  getAllProducts,
  deleteProduct,
  createProduct
};

export default productsService;
