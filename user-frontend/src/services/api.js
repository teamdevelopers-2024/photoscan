import axios from 'axios';

axios.defaults.withCredentials = true;  // Ensure cookies are sent with requests

// const apiClient = axios.create({
//   baseURL: 'https://api.photoscan.co.in/user',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


const apiClient = axios.create({
  baseURL: 'http://localhost:4000/user',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle token refresh
const refreshToken = async () => {
  try {
    const response = await apiClient.post('/refresh-token');  // No need to send the refresh token manually
    return response.data.accessToken;  // Assuming new accessToken is set in the cookies by backend
  } catch (error) {
    console.error('Failed to refresh token:', error);
    // Handle token refresh failure (e.g., redirect to login page)
    throw error;
  }
};


// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,  // If response is successful, just return it
  async (error) => {  // Handle token expiration and refresh logic
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Mark request as retried to prevent loops
      console.log('inside interceptors')
      try {
        await refreshToken();  // Attempt to refresh token
        return apiClient(originalRequest);  // Retry original request
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Handle logout or redirection if refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);  // If error is not due to expired token or refresh fails
  }
); 1

// Example login function
const userLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;  // Tokens should be set in cookies by backend
  } catch (error) {
    console.error('Login failed:', error);
    return error.response.data;
  }
}

// Other API functions remain unchanged...
const userRegister = async (details) => {
  try {
    const response = await apiClient.post('/register', details);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    return error.response.data;
  }
};

const getOtp = async (email) => {
  try {

    const response = await apiClient.post('/getOtp', { email });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Failed to get OTP:', error);
    return error.response.data;
  }
};
  
const verifyOtp = async (email, otp) => {
  try {
    const response = await apiClient.post('/verifyOtp', { email, otp });
    return response.data;
  } catch (error) {
    console.error('Failed to verify OTP:', error);
    return error.response.data;
  }
};

const editProfile = async (profileData) => {
  try {
    const response = await apiClient.put('/editProfile', profileData);
    return response.data;  // Assuming the backend responds with the updated user info
  } catch (error) {
    console.error('Profile update failed:', error);
    return error.response.data;
  }
};


const checkAuthenticate = async () => {
  try {
    console.log('insed checkAuthenticate')
    const response = await apiClient.get('/checkAuthenticate');
    const data = response.data
    console.log(data)
    return data
  } catch (error) {
    console.error('Authentication check failed:', error.response.data);
    return error.response.data;
  }
};



const logout = async () => {
  try {
    const response = await apiClient.delete('/logout')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}

const resetOtp = async (email) => {
  try {

    const response = await apiClient.post('/resetOtp', { email });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Failed to get OTP:', error);
    return error.response.data;
  }
};

const newPass = async (email, password) => {
  try {

    const response = await apiClient.post('/newPass', { email, password });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Failed to get Password:', error);
    return error.response.data;
  }
};

const changePass = async (body) => {
  try {

    const response = await apiClient.post('/changePass', {
      body
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Failed to get Password:', error);
    return error.response.data;
  }
};



async function getBanners() {
  try {
    const response = await apiClient.get('/getBanners');
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
}


const getProducts = async () => {
  try {

    const response = await apiClient.get('/getProducts');
    return response.data;
  } catch (error) {
    console.error('Failed to get fetch momentos:', error);
    return error.response.data;
  }
};


async function getSingleProduct(id) {
  try {
    const response = await apiClient.get(`/getSingleProduct?id=${id}`)
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}


export default {
  userLogin,
  userRegister,
  getOtp,
  verifyOtp,
  checkAuthenticate,
  editProfile,
  logout,
  resetOtp,
  newPass,
  changePass,
  getBanners,
  getProducts,
  getSingleProduct
};
