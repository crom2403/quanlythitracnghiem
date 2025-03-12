import axios from "axios"
// import useAuthStore from "~/stores/authStore"

// eslint-disable-next-line prefer-const
let instance = axios.create()
const serverUrl = import.meta.env.VITE_SERVER_URL
instance.defaults.baseURL = serverUrl

// Thời gian chờ tối đa của 1 request : để 10 phút
instance.defaults.timeout = 1000 * 60 * 10

// withCredentials : cho phép tự động đính kèm cookie vào header khi gửi request
instance.defaults.withCredentials = true

instance.interceptors.request.use(
  (config) => {
    // lấy accessToken từ localStorage đính vào header
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      // Cần thêm "Bearer " vì tuân thủ theo tiêu chuẩn OAuth 2.0 trong việc xác định loại token
      // Bearer token là loại token dành cho việc xác thực và ủy quyền
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 410 && !originalRequest._retry) {
      // 410 means "Gone"
      originalRequest._retry = true
      const refreshToken = localStorage.getItem("refreshToken")
      try {
        const { data } = await instance.post("/auth/refresh-token", { refreshToken })
        localStorage.setItem("accessToken", data.accessToken)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return instance(originalRequest)
      } catch (refreshError) {
        // const { logout } = useAuthStore()
        // logout()
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default instance
