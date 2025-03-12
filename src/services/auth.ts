import { LoginType } from "../types/authType"
import instance from "./instance"
import api_routes from "../utils/api_routes"

// export const apiRegister = (data) => instance.post("/auth/register", data)

export const apiLogin = (data: LoginType) => instance.post(api_routes.login, data)

export const apiRefreshToken = (refreshToken: string) =>
  instance.post("/auth/refresh-token", refreshToken)

export const apiLogout = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("userInfo")
}
