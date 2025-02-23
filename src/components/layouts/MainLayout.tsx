import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sitebar from "./Sidebar"
const MainLayout = () => {
  return (
    <div className="w-full">
      <div className="flex h-full">
        <div className="w-1/6">
          <Sitebar />
        </div>
        <div className="w-5/6 bg-gray-100">
          <div className="w-full h-16 bg-white">
            <Header />
          </div>
          <div className="w-full overflow-y-scroll py-8 px-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
