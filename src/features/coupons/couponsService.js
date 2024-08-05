import axios from "axios";
import { config } from "../../utils/config";
import { coupons_base_url } from "../../utils/base_url";

const getAllCoupons = async () => {
  const response = await axios.get(`${coupons_base_url}/`, config);
  return response.data;
};

const createCoupon = async (data) => {
  const response = await axios.post(`${coupons_base_url}/`, data, config);
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${coupons_base_url}/${id}`, config);
  return response.data;
};

const updateCoupon = async (id , data) => {
  

  console.log(id,data)

  const response = await axios.put(`${coupons_base_url}/${id}`, data, config);
  return response.data;
};

const colorsService = {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
  updateCoupon,
};

export default colorsService;
