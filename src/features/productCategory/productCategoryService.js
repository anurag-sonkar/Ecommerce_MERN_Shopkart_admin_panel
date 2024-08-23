import axios from "axios";
import { product_category_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";
// import { config } from "../../utils/config";

const getAllProductsCategory = async () => {
  const response = await axios.get(`${product_category_base_url}/`);
  return response.data;
};

const createProductsCategory = async (productCategory) => {
    const response = await axios.post(`${product_category_base_url}/`, { title: productCategory }, getConfig());
    return response.data;
};

const deleteProductsCategory = async (id) => {
    const response = await axios.delete(`${product_category_base_url}/${id}`, getConfig());
    return response.data;
};

const updateProductsCategory = async (updateProductCategory, id) => {
    const response = await axios.put(
      `${product_category_base_url}/${id}`,
      { title: updateProductCategory },
      getConfig()
    );
    console.log(response)
    return response.data;
};

const productCategoryService = {
  getAllProductsCategory,
  createProductsCategory,
  deleteProductsCategory,
  updateProductsCategory,
};

export default productCategoryService;
