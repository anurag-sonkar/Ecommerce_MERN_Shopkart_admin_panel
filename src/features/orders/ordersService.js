import axios from "axios";
import { orders_base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getAllOrders = async () => {
  const response = await axios.get(`${orders_base_url}/get-all`, config);
  console.log("heelo",response.data)
  return response.data;
};

// const createOrders = async (brand) => {
//     const response = await axios.post(`${orders_base_url}/`, {title:brand}, config);
    
//     return response.data;
//   };
  
  const deleteOrders = async (id) => {
    const response = await axios.delete(`${orders_base_url}/${id}`, config);
  return response.data;
};

const updateOrders = async (status, id) => {
  console.log(status,id)
  const response = await axios.put(
    `${orders_base_url}/update-status/${id}`,
    { status: status },
    config
  );
console.log(response.data)
  return response.data;
};

const ordersService = {
    getAllOrders,
    // createOrders,
  deleteOrders,
  updateOrders,
};

export default ordersService;
