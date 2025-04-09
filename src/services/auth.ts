import { LoginType } from "../types/authType"
import instance from "./instance"
import routes from "./routes"

// export const apiRegister = (data) => instance.post("/auth/register", data)

export const apiLogin = (data: LoginType) => instance.post(routes.login, data)

export const apiRefreshToken = (refreshToken: string) =>
  instance.post("/auth/refresh-token", refreshToken)

export const apiLogout = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("currentUser")
}
