import axios from "axios";
import { customers_base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

const getAllUsers = async () => {
    const response = await axios.get(`${customers_base_url}/allusers`, config);

    console.log(response.data.users)
    
    return response.data.users; 
}

const customersService = {
    getAllUsers
}

export default customersService;
