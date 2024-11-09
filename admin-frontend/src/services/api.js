import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
    baseURL: 'http://localhost:4000/admin',
    withCredentials: true,
});


// const apiClient = axios.create({
//     baseURL: 'https://api.photoscan.co.in/admin',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// Centralized helper function for making API requests
const apiRequest = async (method, url, data = null) => {
    try {
        const response = await apiClient({ method, url, data });
        return response.data;
    } catch (error) {
        let errorMessage = "An error occurred.";

        if (error.response) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error.request) {
            errorMessage = "No response received from server.";
        } else {
            errorMessage = error.message || errorMessage;
        }

        console.error(`Error during ${method} request to ${url}:`, error);
        return { error: true, message: errorMessage };
    }
};

// API functions using the centralized request handler

const checkAdmin = async (email, password) => {
    return await apiRequest('post', '/login', { email, password });
};

const getUsers = async (limit, page) => {
    return await apiRequest('get', `/getUsers?page=${page}&limit=${limit}`);
};

const addBanner = async (data) => {
    return await apiRequest('post', '/addbanner', { data });
};

const deleteBanner = async (publicId) => {
    return await apiRequest('post', '/deletebanner', { publicId });
};

const getBanners = async () => {
    return await apiRequest('get', '/getbanners');
};

const getProducts = async (isUnlisted) => {
    return await apiRequest('get', `/getproducts?status=${isUnlisted}`);
};

const addCategory = async (body) => {
    return await apiRequest('post', '/addCategory', body);
};

const addProduct = async (body) => {
    return await apiRequest('post', '/addproduct', body);
};

const getCategories = async (active) => {
    return await apiRequest('get', `/getCategories?active=${active}`);
};

const getOffers = async () => {
    return await apiRequest('get', '/getOffers');
};

const getOrder = async () => {
    return await apiRequest('get', '/getorder');
};

const addOffer = async (newOffer) => {
    return await apiRequest('post', '/addOffer', newOffer);
};

const deleteOffer = async (id) => {
    return await apiRequest('delete', `/deleteOffer?id=${id}`);
};

const updateActive = async (id) => {
    return await apiRequest('put', `/updateActive?id=${id}`);
};

const blockUser = async (id) => {
    return await apiRequest('put', '/blockUser', { id });
};

const logout = async () => {
    return await apiRequest('get', '/logout');
};

const updateFeatured = async (id, detail) => {
    return await apiRequest('post', '/updateFeatured', { id, detail });
};

const getCardData = async () => {
    return await apiRequest('get', '/getCardData');
};

const getGraphData = async () => {
    return await apiRequest('get', '/getGraphData');
};

const updateProductStatus = async (id) => {
    return await apiRequest('put', '/updateProductStatus', { id });
};

const updateProduct = async (id, product) => {
    return await apiRequest('post', '/updateProduct', { id, product });
};

const updateOrderStatus = async (id, status) => {
    return await apiRequest('post', '/updateOrderStatus', { id, status });
};

// Export all functions
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
    updateOrderStatus,
};
