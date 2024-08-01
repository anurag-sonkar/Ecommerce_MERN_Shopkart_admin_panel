import axios from "axios";
import { auth_base_url } from "../../utils/base_url";

const login = async (userData) => {
    const response = await axios.post(`${auth_base_url}/admin-login`, userData);
    // console.log(response)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data; 
}

const authService = {
    login
}

export default authService;
