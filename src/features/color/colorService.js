import axios from "axios";
// import { config } from "../../utils/config";
import { color_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";

const getAllColors = async () => {
  const response = await axios.get(`${color_base_url}/`, getConfig());
  return response.data;
};

const createColor = async (color) => {
    const response = await axios.post(`${color_base_url}/`, {color:color}, getConfig());
    return response.data;
  };
  
  const deleteColor = async (id) => {
    const response = await axios.delete(`${color_base_url}/${id}`, getConfig());
    console.log(response)
  return response.data;
};

const updateColor = async (color, id) => {
  const response = await axios.put(
    `${color_base_url}/${id}`,
    { color: color },
    getConfig()
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
