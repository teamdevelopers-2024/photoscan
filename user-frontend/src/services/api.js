import axios from 'axios';

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to refresh the access token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await apiClient.post('/user/refresh-token', { refreshToken });
    const { accessToken } = response.data;

    // Save new tokens
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    // Handle token refresh failure
    throw error;
  }
};


apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle token refresh on request failure
apiClient.interceptors.response.use(
  (response) => response,  // If response is successful, just return it.
  async (error) => {  // If response has an error, handle it here.
    const originalRequest = error.config;  // Keep a reference to the original request.
    

    // Check if the error is due to unauthorized access and it's the first retry attempt.
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Mark the request as already retried to avoid infinite loops.

      try {
        const newAccessToken = await refreshToken();  // Get a new access token by refreshing.

        // Set the new access token on the original request directly.
        originalRequest.headers['Authorization'] = `${newAccessToken}`;

        // Also update the default headers in apiClient if necessary.
        apiClient.defaults.headers.common['Authorization'] = `${newAccessToken}`;

        // Retry the original request with the new token.
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        // If refreshing fails, redirect to login or handle the error appropriately.
        return Promise.reject(refreshError);
      }
    }

    // If the error is not due to token expiration or refresh failed, reject the promise.
    return Promise.reject(error);
  }
);


export const userLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/user/login', { email, password });
    const data = response.data;
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
  } catch (error) {
    console.error('Login failed:', error);
    return error.response.data;
  }
};

const userRegister = async (details) => {
  try {
    const response = await apiClient.post('/user/register', details);
    const data = response.data;
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
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

const checkAuthenticate = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('accessToken : ',accessToken)
    console.log('refreshToken : ', refreshToken)
    const response = await apiClient.get('/user/checkAuthenticate', {
      headers: {
        'Authorization': `${accessToken}`
      },
      params: {
        refreshToken
      }
    });
    console.log('response : ',response.data)

    return response.data;
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
  checkAuthenticate
};
