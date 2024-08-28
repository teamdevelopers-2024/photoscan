import axios from 'axios';

axios.defaults.withCredentials = true;  // Ensure cookies are sent with requests

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle token refresh
const refreshToken = async () => {
  try {
    const response = await apiClient.post('/user/refresh-token');  // No need to send the refresh token manually
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
);

// Example login function
export const userLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/user/login', { email, password });
    return response.data;  // Tokens should be set in cookies by backend
  } catch (error) {
    console.error('Login failed:', error);
    return error.response.data;
  }
};

// Other API functions remain unchanged...
const userRegister = async (details) => {
  try {
    const response = await apiClient.post('/user/register', details);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    return error.response.data;
  }
};

const getOtp = async (email) => {
  try {
    const response = await apiClient.post('/user/getOtp', { email });
    return response.data;
  } catch (error) {
    console.error('Failed to get OTP:', error);
    return error.response.data;
  }
};

const verifyOtp = async (email, otp) => {
  try {
    const response = await apiClient.post('/user/verifyOtp', { email, otp });
    return response.data;
  } catch (error) {
    console.error('Failed to verify OTP:', error);
    return error.response.data;
  }
};
const fetchUser=async()=>{
  try {
    const response=await apiClient.get('/user/fetchUser');
    const data=response.data.user
    
    return data;
  } catch (error) {
    
  }
}

const checkAuthenticate = async () => {
  try {
    console.log('insed checkAuthenticate')
    const response = await apiClient.get('/user/checkAuthenticate');
    const data = response.data
    console.log(data)
    return data
  } catch (error) {
    console.error('Authentication check failed:', error.response.data);
    return error.response.data;
  }
};

export default {
  userLogin,
  userRegister,
  getOtp,
  verifyOtp,
  checkAuthenticate,
  fetchUser
};
