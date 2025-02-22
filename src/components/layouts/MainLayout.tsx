import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sitebar from "./Sidebar"
const MainLayout = () => {
  return (
    <div className="w-full h-screen flex ">
      <div className="w-1/6">
        <Sitebar />
      </div>
      <div className="w-5/6 flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
