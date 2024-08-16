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


const getUsers = async (limit , page)=>{
  console.log(limit , page)
  console.log('i can see the call')
  try {
    const response = await axios.get(`http://localhost:4000/admin/getUsers?page=${page}&limit=${limit}`); 
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default {
  checkadmin,
  getUsers
};