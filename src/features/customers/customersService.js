import axios from "axios";
import { customers_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";
// import {  getConfig } from "../../utils/config";

const getAllUsers = async () => {
    // console.log(config)
    const response = await axios.get(`${customers_base_url}/allusers`,getConfig());

    console.log(response)
    
    return response.data.users; 
}

const updateCustomerStatus = async (data) => {
    const {id , status} = data
    console.log(data)
    const response = await axios.put(`${customers_base_url}/user-status/${id}`, {status:status},getConfig());

    console.log(response.data.users)
    
    return response.data.users; 
}

const customersService = {
    getAllUsers,updateCustomerStatus
}

export default customersService;
