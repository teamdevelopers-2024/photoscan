import axios from 'axios';
axios.defaults.withCredentials = true;

const checkadmin = async (email, password) => {
    console.log(email,password);
    
  try {
    const response = await axios.post('http://localhost:4000/admin/login', { email:email, password:password }); 
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default checkadmin;