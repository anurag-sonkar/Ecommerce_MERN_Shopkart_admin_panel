import axios from "axios";
import { brands_base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getAllBrands = async () => {
  const response = await axios.get(`${brands_base_url}/`, config);
  return response.data.response;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${brands_base_url}/${id}`, config);
  return response.data;
};

const updateBrand = async (brand, id) => {
  const response = await axios.put(
    `${brands_base_url}/${id}`,
    { title: brand },
    config
  );

  return response.data;
};

const brandsService = {
  getAllBrands,
  deleteBrand,
  updateBrand,
};

export default brandsService;
