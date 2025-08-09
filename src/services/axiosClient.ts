import Toast from "@/utils/toast";
import axios from "axios";

// Tạo instance riêng cho Axios
const axiosClient = axios.create({
  baseURL: "http://localhost:8080", // API base URL của bạn
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response; // Trả về data trực tiếp
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          Toast.error("Unauthorized. Please login again.");
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          // Có thể redirect đến login, hoặc xóa token...
          break;
        case 403:
          Toast.error("You do not have permission to perform this action.");
          break;
        case 500:
          Toast.error(error.response.data?.message || "Internal server error.");
          break;
        default:
          Toast.error(error.response.data?.message || "An error occurred.");
      }
    } else if (error.request) {
      Toast.error("No response from server. Please check your network.");
    } else {
      Toast.error("Request error: " + error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
