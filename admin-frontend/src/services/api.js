import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
    baseURL: 'http://localhost:4000/admin',
    withCredentials: true,
});


const checkAdmin = async (email, password) => {
    console.log('Admin Login Attempt:', { email, password });
    
    try {
        const response = await apiClient.post('/login', { email, password });
        console.log('Admin Login Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Admin Login Error:', error);
        return null;
    }
};

 
const getUsers = async (limit, page) => {
    console.log('Fetching Users:', { limit, page });
    
    try {
        const response = await apiClient.get(`/getUsers?page=${page}&limit=${limit}`);
        console.log('Fetched Users:', response.data);
        return response.data;
    } catch (error) {
        console.error('Get Users Error:', error);
        return null;
    }
};


const addFrames = async (data) => {
    console.log('Adding Frame:', data);
    
    try {
        const response = await apiClient.post('/addframes', { data });
        console.log('Add Frame Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding frame:', error);
        return null;
    }
};

const getFrames = async () => {
    console.log('Fetching Frames...');
    
    try {
        const response = await apiClient.get('/getframes');
        console.log('Fetched Frames:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting frames:', error);
        return null;
    }
};


export default {
    checkAdmin,
    getUsers,
    addFrames,
    getFrames,
};
