import axios from "axios";
import { products_base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const uploadImages = async (data) => {
  const response = await axios.put(
    `${products_base_url}/upload`,
    data,
    config
  );
  return response.data;
};

const deleteImages = async (id) => {
  const response = await axios.delete(
    `${products_base_url}/delete-image/${id}`,
    config
  );
  return response.data;
};
const uploadService = {
    uploadImages,
    deleteImages
  
};

export default uploadService;
