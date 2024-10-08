import axios from "axios";
import { orders_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";
// import { config } from "../../utils/config";

const getAllOrders = async () => {
  const response = await axios.get(`${orders_base_url}/get-all` , getConfig());
  // console.log("heelo",response.data)
  return response.data;
};

// const createOrders = async (brand) => {
//     const response = await axios.post(`${orders_base_url}/`, {title:brand}, config);

//     return response.data;
//   };

const deleteOrders = async (id) => {
  const response = await axios.delete(`${orders_base_url}/${id}` , getConfig());
  return response.data;
};

const updateOrders = async (status, id) => {
  const response = await axios.put(`${orders_base_url}/update-status/${id}`, {
    status: status,
  } , getConfig());
  console.log(response.data);
  return response.data;
};

const getMonthWiseOrderStats = async () => {
  // console.log(status,id)
  const response = await axios.get(`${orders_base_url}/getMonthWiseOrderStats` , getConfig());
  console.log(response)
  return response.data;
};

const getYearWiseOrderStats = async () => {
  // console.log(status,id)
  const response = await axios.get(`${orders_base_url}/getYearlyTotalOrders` , getConfig());
  // console.log(response)
  return response.data;
};

const ordersService = {
  getAllOrders,
  // createOrders,
  deleteOrders,
  updateOrders,
  getMonthWiseOrderStats,
  getYearWiseOrderStats,
};

export default ordersService;
