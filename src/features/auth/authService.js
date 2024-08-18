import axios from "axios";
import { auth_base_url } from "../../utils/base_url";
import { config } from "../../utils/config";

// const forgotPassword = async(email)=>{
//   const response = await axios.post(`${auth_base_url}/auth/forgot-password`, email);
//     console.log(response)
// }


const login = async (userData) => {
    // console.log(userData)
    const response = await axios.post(`${auth_base_url}/auth/admin-login`, userData);
    console.log(response)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data.result; 
}

const signOut = async ()=>{
    const response = await axios.put(`${auth_base_url}/logout`,{}, config)
    if(response.data){
      ['user', 'collapsed', 'selectedKey', 'dashboardThemeState' , 'tour'].forEach((key) => localStorage.removeItem(key));
    }
    // console.log(response.data)
    return response.data
    
}

const register = async (data)=>{
    const response = await axios.post(`${auth_base_url}/auth/register`, data ,{
        headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response)
    return response.data.result


}

const forgotPassword = async (data)=>{
  const response = await axios.post(`${auth_base_url}/auth/forgot-password` , data)
  console.log(response)
  return response.data
}

const resetPassword = async (data)=>{
  try {
      const {password ,token} = data
  const response = await axios.put(`${auth_base_url}/auth/reset-password/${token}` , {password})
  console.log(response)
  return response.data
  } catch (error) {
      return error.message
      
  }
}

const getMonthWiseOrderStats = async () => {
  // console.log(status,id)
  const response = await axios.get(
    `${auth_base_url}/getMonthWiseOrderStats`,
    config
  );
// console.log(response)
  return response.data;
};

const getYearWiseOrderStats = async () => {
  // console.log(status,id)
  const response = await axios.get(
    `${auth_base_url}/getYearlyTotalOrders`,
    config
  );
// console.log(response)
  return response.data;
};



const authService = {
    login,signOut,register,forgotPassword,resetPassword,getMonthWiseOrderStats,getYearWiseOrderStats
}

export default authService;
