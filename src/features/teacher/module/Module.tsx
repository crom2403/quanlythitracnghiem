import { EyeOff, Info, Pencil, Plus, Settings, Trash2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Input } from "../../../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { apiGetStudyGroup } from "../../../services/teacher/study-group"
import useAuthStore from "../../../stores/authStore"
import path from "../../../utils/path"

export interface ModuleResponse {
  name: string
  studyGroups: {
    id: number
    name: string
    note: string
    student_count: number
  }[]
}

const Module = () => {
  const [data, setData] = useState<ModuleResponse[]>([])
  const [loading, setLoading] = useState(false)
  const teacherId = useAuthStore((state) => state.currentUser)?.id

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await apiGetStudyGroup(teacherId)
        console.log("Response data:", response.data)
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Select>
            <SelectTrigger className="min-w-[150px] rounded-e-none bg-gray-200 font-bold">
              <SelectValue placeholder="Đang giảng dạy" className="font-bold" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="me" defaultChecked>
                Đang giảng dạy
              </SelectItem>
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectContent>
          </Select>
          <Input className="rounded-s-none min-w-[320px]" placeholder="Tìm kiếm nhóm..." />
        </div>
        <Button className="bg-blue-800 text-white">
          <Plus /> Thêm nhóm
        </Button>
      </div>
      <div className="flex flex-col mt-8 gap-8">
        {data.map((module, index) => (
          <div key={index} className="">
            <p className="font-medium">{module.name}</p>
            <div className="flex gap-4">
              {module.studyGroups?.map((group) => (
                <div
                  key={group.id}
                  className="w-[250px] flex flex-col bg-white rounded-md mt-2 shadow-sm"
                >
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-t-md">
                    <p className="font-medium">{group.name}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button className="px-2 py-[2px] bg-gray-100 text-black/80 hover:bg-gray-200">
                          <Settings />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <Link to={`${path.TEACHER.MODULE_DETAIL}/${group.id}`}>
                          <DropdownMenuItem>
                            <Info /> Danh sách sinh viên
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <Pencil /> Sửa thông tin
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <EyeOff /> Ẩn nhóm
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 hover:bg-red-100">
                          <Trash2 /> Xóa nhóm
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="py-4">
                    <p className="px-4 py-2 text-sm">{group.note}</p>
                    <p className="px-4 py-2 text-sm">Số lượng: {group.student_count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Module
