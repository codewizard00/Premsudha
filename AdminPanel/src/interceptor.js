import axios from "axios";

const setupAxiosInterceptors = (tokens, dispatch) => {
    const request = axios.create({
      baseURL: process.env.REACT_APP_PROD_URL
    });
    request.interceptors.response.use(null, err => {
      const {
        config,
        response: { status }
      } = err;
      const originalRequest = config;
      if (status === 401) {
        
      }
      return Promise.reject(err);
    });
  
    return request;
  };
  
  export default setupAxiosInterceptors;