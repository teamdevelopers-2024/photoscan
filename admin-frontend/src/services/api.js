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
const getProducts = async (isUnlisted) => {
    console.log('Fetching Banners...');

    try {
        const response = await apiClient.get(`/getproducts?status=${isUnlisted}`);
        console.log('Fetched Products:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting Products:', error);
        return null;
    }
};


async function addCategory(body) {
    try {
        const response = await apiClient.post("/addCategory", body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}
async function addProduct(body) {
    try {
        const response = await apiClient.post("/addproduct", body)
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

const getOffers = async () => {
    console.log('Fetching Offers...');

    try {
        const response = await apiClient.get('/getOffers');
        console.log('Fetched Offers:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting Offers:', error);
        return null;
    }
};
const getOrder = async () => {
    console.log('Fetching Orders...');

    try {
        const response = await apiClient.get('/getorder');
        console.log('Fetched Oders:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting Oders:', error);
        return null;
    }
};

async function addOffer(newOffer) {
    try {
        const response = await apiClient.post('/addOffer', newOffer)
        return response.data;
    }
    catch (error) {
        console.log(error)
        return error.response.data;
    }
}
const deleteOffer = async (id) => {
    console.log('Deleting Offer:', { id });

    try {
        const response = await apiClient.delete(`/deleteOffer?id=${id}`);
        console.log('Delete Offer Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting offer:', error);
        return null;
    }
};


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
        const response = await apiClient.put("/blockUser", { id: id })
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


async function updateFeatured(id, detail) {
    try {
        const response = await apiClient.post("/updateFeatured", { id, detail })
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}
async function getCardData() {
    try {
        const response = await apiClient.get(`/getCardData`);
        return response.data;
    } catch (error) {
        console.error("Error fetching card data:", error);
        return { error: true, message: error.response?.data?.message || "An error occurred." };
    }
}

async function getGraphData(){
    try {
        const response = await apiClient.get(`/getGraphData`)
        return response.data;
    } catch (error) {
        console.log("Error Fetching graph Data".error)
        return {error:true,message:error.response?.data?.message || "An error occured."};
    }
}

async function updateProductStatus(id) {
    try {
        const response = await apiClient.put("/updateProductStatus", { id })
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}
async function updateProduct(id, product) {
    try {
        const response = await apiClient.post("/updateProduct", { id, product })
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}
async function updateOrderStatus(id, status) {
    try {
        const response = await apiClient.post("/updateOrderStatus", { id, status })
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
    getCardData,
    getGraphData,
    getBanners,
    getCategories,
    getOffers,
    addCategory,
    addOffer,
    updateActive,
    deleteOffer,
    blockUser,
    logout,
    deleteBanner,
    getProducts,
    updateFeatured,
    updateProductStatus,
    updateProduct,
    getOrder,
    updateOrderStatus
};
