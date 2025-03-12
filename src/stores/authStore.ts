// import { create } from 'zustand';
// import { getCurrentUser  } from '@apis/userApi';
// import { apiLogin, apiLogout, apiRegister } from '@apis/authApi';
// import { persist } from 'zustand/middleware';

// // Định nghĩa kiểu cho CurrentUser
// interface CurrentUser  {
//   // Thêm các thuộc tính cần thiết cho CurrentUser
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
// }

// // Định nghĩa kiểu cho Store
// interface AuthStore {
//   current:User  CurrentUser  | null;
//   accessToken: string;
//   refreshToken: string;
//   loading: boolean;
//   login:User  (data: any) => Promise<any>; // Thay thế 'any' bằng kiểu dữ liệu thực tế nếu có
//   register:User  (data: any) => Promise<any>; // Thay thế 'any' bằng kiểu dữ liệu thực tế nếu có
//   logout:User  () => Promise<void>;
//   checkUser LoggedIn: () => Promise<void>;
//   updateAvatar: (avatar: string) => void;
//   updateInfo: (userinfo: CurrentUser ) => void;
// }

// const useAuthStore = create<AuthStore>(
//   persist(
//     (set, get) => ({
//       current:User  null,
//       accessToken: '',
//       refreshToken: '',
//       loading: true,
//       login:User  async (data) => {
//         try {
//           const user = await apiLogin(data);
//           set({
//             current:User  user?.data?.userInfo,
//             accessToken: user?.data?.accessToken,
//             refreshToken: user?.data?.refreshToken,
//           });
//           localStorage.setItem('accessToken', user?.data?.accessToken);
//           localStorage.setItem('refreshToken', user?.data?.refreshToken);
//           return user;
//         } catch (error) {
//           console.error('Login error:', error);
//           throw error;
//         }
//       },
//       register:User  async (data) => {
//         try {
//           const user = await apiRegister(data);
//           set({ current:User  user });
//           return user;
//         } catch (error) {
//           console.error('Registration error:', error);
//           throw error;
//         }
//       },
//       logout:User  async () => {
//         try {
//           await apiLogout();
//           set({ current:User  null, accessToken: '', refreshToken: '' });
//         } catch (error) {
//           console.error('Logout error:', error);
//           throw error;
//         }
//       },
//       checkUser LoggedIn: async () => {
//         try {
//           const user = await getCurrentUser ();
//           set({ current:User  user, loading: false });
//         } catch (error) {
//           console.error('Error checking user login status:', error);
//           set({ loading: false });
//         }
//       },
//       updateAvatar: (avatar: string) => set((state) => ({ current:User  { ...state.currentUser , avatar } })),
//       updateInfo: (userinfo: CurrentUser ) => set({ current:User  userinfo }),
//     }),
//     {
//       name: 'auth-storage',
//       getStorage: () => localStorage,
//     },
//   )
// );

// export default useAuthStore;
