import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { apiLogout } from "../services/auth"

// Định nghĩa kiểu cho Role
export interface Role {
  id: number
  name: string
  description: string
}

// Định nghĩa kiểu cho CurrentUser
export interface CurrentUser {
  id: number
  student_code: string
  email: string
  fullname: string
  gender: string
  birthday: string
  status: boolean
  avatar?: string | null
  role: Role
  refreshToken: string
  accessToken: string
}

// Định nghĩa kiểu cho Store
interface AuthStore {
  currentUser: CurrentUser | null
  accessToken: string
  refreshToken: string
  login: (data: CurrentUser) => Promise<void> // Cải thiện kiểu thay vì dùng any
  logout: () => Promise<void>
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: null,
      accessToken: "",
      refreshToken: "",
      login: async (user: CurrentUser) => {
        // Cập nhật state với dữ liệu từ tham số user
        set({
          currentUser: user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        })
        localStorage.setItem("accessToken", user.accessToken)
        localStorage.setItem("refreshToken", user.refreshToken)
      },
      logout: async () => {
        try {
          await apiLogout()
          set({ currentUser: null, accessToken: "", refreshToken: "" })
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
        } catch (error) {
          console.error("Logout error:", error)
          throw error
        }
      },
    }),
    {
      name: "auth-storage", // Tên key trong localStorage
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ), // Lưu vào localStorage
    }
  )
)

export default useAuthStore
