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


const addBanner = async (data) => {
    console.log('Adding Banner:', data);
    
    try {
        const response = await apiClient.post('/addbanner', { data });
        console.log('Add Frame Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding frame:', error);
        return null;
    }
};
const deleteBanner = async (publicId) => {
    console.log('deleting Banner:', publicId);
    
    try {
        const response = await apiClient.post('/deletebanner', { publicId });
        console.log('Deleted banner sucessfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding frame:', error);
        return null;
    }
};

const getBanners = async () => {
    console.log('Fetching Banners...');
    
    try {
        const response = await apiClient.get('/getbanners');
        console.log('Fetched Banners:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting Banners:', error);
        return null;
    }
};
const getProducts = async () => {
    console.log('Fetching Banners...');
    
    try {
        const response = await apiClient.get('/getproducts');
        console.log('Fetched Products:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting Products:', error);
        return null;
    }
};


async function addCategory(body) {
    try {
        const response = await apiClient.post("/addCategory",body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}
async function addProduct(body) {
    try {
        const response = await apiClient.post("/addproduct",body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}



async function getCategories(active) {
    try {
        const response = await apiClient.get(`/getCategories?active=${active}`)
        return response.data
    } catch (error) {
      console.log(error)
      return error.response.data  
    }
}


async function updateActive(id) {
    try {
        const response = await apiClient.put(`/updateActive?id=${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data  
    }
}



async function blockUser(id) {
    try {
        const response = await apiClient.put("/blockUser",{id:id})
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}
async function logout() {
    try {
        const response = await apiClient.get("/logout")
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export default {
    checkAdmin,
    getUsers,
    addBanner,
    addProduct,
    getBanners,
    addCategory,
    getCategories,
    updateActive,
    blockUser,
    logout,
    deleteBanner,
    getProducts,
};
