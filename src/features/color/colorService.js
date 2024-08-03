import axios from "axios";
import { config } from "../../utils/config";
import { color_base_url } from "../../utils/base_url";

const getAllColors = async () => {
  const response = await axios.get(`${color_base_url}/`, config);
  return response.data;
};

const createColor = async (color) => {
    console.log("color:",color)
    const response = await axios.post(`${color_base_url}/`, {color:color}, config);
    return response.data;
  };
  
  const deleteColor = async (id) => {
    const response = await axios.delete(`${color_base_url}/${id}`, config);
  return response.data;
};

const updateColor = async (color, id) => {
  const response = await axios.put(
    `${color_base_url}/${id}`,
    { color: color },
    config
  );
  return response.data;
};

const colorsService = {
    getAllColors,
    createColor,
  deleteColor,
  updateColor,
};

export default colorsService;
