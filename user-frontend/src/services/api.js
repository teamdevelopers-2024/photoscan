import axios from 'axios';
axios.defaults.withCredentials = true;



export const userLogin = async (email, password) => {
    console.log(email,password);
    
  try {
    const response = await axios.post('http://localhost:4000/user/login', { email:email, password:password }); 
    console.log(response.data);
    const data=response.data;
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    
    return data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};


const userRegister = async (details) => {
    
  try {
    const response = await axios.post('http://localhost:4000/user/register',details); 
    const data = response.data
    return data;
  } catch (error) {
    return error.response.data
  }
};


const getOtp = async (email) => {
    
  try {
    const response = await axios.post('http://localhost:4000/user/getOtp',{email:email}); 
    const data = response.data
    return data;
  } catch (error) {
    return error.response.data
  }
};
const verifyOtp = async (email,otp) => {
    
  try {
    const response = await axios.post('http://localhost:4000/user/verifyOtp',{email:email ,otp:otp}); 
    const data = response.data
    return data;
  } catch (error) {
    return error.response.data
  }
};





export default {
    userLogin,
    userRegister,
    getOtp,
    verifyOtp
}