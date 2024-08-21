import axios from 'axios';
axios.defaults.withCredentials = true;

const userLogin = async (email, password) => {
    console.log(email,password);
    
  try {
    const response = await axios.post('http://localhost:4000/user/login', { email:email, password:password }); 
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const userRegister = async (details) => {
    
  try {
    const response = await axios.post('http://localhost:4000/user/register',details); 
    return response.data;
  } catch (error) {
    console.log('coming inside')
    return error.response.data
  }
};



export default {
    userLogin,
    userRegister
}