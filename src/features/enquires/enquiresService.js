import axios from "axios";
import { enquiry_base_url } from "../../utils/base_url";
import  {getConfig}  from "../../utils/config";

const getAllEnquires = async () => {
  const response = await axios.get(`${enquiry_base_url}/`, getConfig());
//   console.log(response)
  return response.data;
};

const createEnquires = async (brand) => {
    const response = await axios.post(`${enquiry_base_url}/`, {title:brand}, getConfig());
    
    return response.data;
  };
  
  const deleteEnquires = async (id) => {
    const response = await axios.delete(`${enquiry_base_url}/${id}`, getConfig());
  return response.data;
};

const updateEnquires = async (status, id) => {
  const response = await axios.put(
    `${enquiry_base_url}/${id}`,
    { status: status },
    getConfig()
  );

  return response.data;
};

const enquiresService = {
    getAllEnquires,
    createEnquires,
  deleteEnquires,
  updateEnquires,
};

export default enquiresService;
