import { FileChartColumn, FileText, Plus, Search } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

const ModuleDetail = () => {
  return (
    <div>
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <Button className="px-[10px] rounded-e-none bg-white text-black">
            <Search />
          </Button>
          <Input
            placeholder="Tìm kiếm sinh viên"
            className="min-w-[300px] bg-white rounded-l-none"
          />
        </div>
        <div className="flex gap-4">
          <Button className="bg-blue-800 text-white">
            <FileText /> Xuất danh sách SV
          </Button>
          <Button className="bg-blue-800 text-white">
            <FileChartColumn /> Xuất bảng điểm
          </Button>
          <Button className="bg-blue-800 text-white">
            <Plus /> Thêm sinh viên
          </Button>
        </div>
      </div>
      <div className="w-full bg-white mt-8 p-4 rounded-md shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-medium">841058 - Lập trình di động - NH2022 - HK2</p>
          <p className="text-red-600">{`Sỉ số: 8`}</p>
        </div>
        <div className="flex flex-col mt-4 gap-4">
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
            <p className="w-1/4">Mã sinh viên</p>
            <p className="w-1/4">Họ và tên</p>
            <p className="w-1/4">Email</p>
            <p className="w-1/4">Số điện thoại</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleDetail
