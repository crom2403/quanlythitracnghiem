import { EyeOff, Info, Pencil, Plus, Settings, Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Input } from "../../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

const mockData = [
  {
    id: 1,
    label: "841059 - Lập trình web - NH2022 - HK1",
    study_groups: [
      {
        id: 1,
        label: "Nhóm 1",
        description: "Chiều thứ 2",
        menbers: 30,
      },
      {
        id: 2,
        label: "Nhóm 2",
        description: "Chiều thứ 6",
        menbers: 20,
      },
    ],
  },
  {
    id: 2,
    label: "841058 - Lập trình di động - NH2022 - HK2",
    study_groups: [
      {
        id: 4,
        label: "Nhóm 1",
        description: "Sáng thứ 2",
        menbers: 30,
      },
      {
        id: 5,
        label: "Nhóm 2",
        description: "Chiều thứ 4",
        menbers: 20,
      },
      {
        id: 7,
        label: "Nhóm 3",
        description: "Chiều thứ 7",
        menbers: 18,
      },
    ],
  },
]

const Module = () => {
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
        {mockData.map((module) => (
          <div key={module.id} className="">
            <p className="font-medium">{module.label}</p>
            <div className="flex gap-4">
              {module.study_groups.map((group) => (
                <div
                  key={group.id}
                  className="w-[250px] flex flex-col bg-white rounded-md mt-2 shadow-sm"
                >
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-t-md">
                    <p className="font-medium">{group.label}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button className="px-2 py-[2px] bg-gray-100 text-black/80 hover:bg-gray-200">
                          <Settings />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Info /> Danh sách sinh viên
                        </DropdownMenuItem>
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
                    <p className="px-4 py-2 text-sm">{group.description}</p>
                    <p className="px-4 py-2 text-sm">Số lượng: {group.menbers}</p>
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
