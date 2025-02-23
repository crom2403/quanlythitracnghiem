import { sidebar_admin } from "../../configs/constants"
import { SidebarItem } from "../../types/common"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="w-full h-screen flex flex-col m-0 p-0">
      <div className="h-16 bg-blue-800 flex justify-between p-4">
        <div>
          <p className="font-bold text-white">STU Test</p>
        </div>
        <div>
          <button className="text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
      <div>
        <div className="p-4">
          {sidebar_admin.map((items: SidebarItem, index) => {
            return (
              <div key={index} className="pb-4">
                <p className="font-semibold text-gray-500 text-md">{items.group}</p>
                {items.items.map((item, index) => {
                  return (
                    <Link
                      to={item.to}
                      key={index}
                      className="flex items-center p-2 hover:bg-gray-100 rounded-sm cursor-pointer"
                    >
                      <div className="mr-2">
                        <div className="flex size-5 text-blue-800">{item.icon}</div>
                      </div>
                      <div className="text-md">{item.title}</div>
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
