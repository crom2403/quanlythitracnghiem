import { FileChartColumn, FileText, Search } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { useEffect, useState } from "react"
import PopupAddStudent from "./PopupAddStudent"
import { useParams } from "react-router-dom"
import { apiGetStudyGroupDetail } from "../../../services/teacher/study-group"

export interface ModuleDetailResponse {
  birthday: string
  email: string
  fullname: string
  gender: string
  id: number
  student_code: string
}

const ModuleDetail = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<ModuleDetailResponse[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (!id) return
        const response = await apiGetStudyGroupDetail(+id)
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
      <div className="w-full flex justify-between">
        <div className="flex items-center">
          <Button className="shadow-sm px-[10px] border border-r-0 rounded-e-none bg-white text-black hover:bg-slate-50">
            <Search className="size-2" />
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
          <PopupAddStudent isOpen={isOpen} handleOpen={setIsOpen} />
        </div>
      </div>
      <div className="w-full bg-white mt-8 p-4 rounded-md shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-medium">841058 - Lập trình di động - NH2022 - HK2</p>
          <p className="text-red-600">{`Sỉ số: ${data.length || 0}`}</p>
        </div>
        <Table>
          <TableCaption>Không có dữ liệu</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12">STT</TableHead>
              <TableHead className="w-3/12">Họ tên</TableHead>
              <TableHead className="w-2/12">Mã sinh viên</TableHead>
              <TableHead className="w-2/12">Giới tính</TableHead>
              <TableHead className="w-2/12">Ngày sinh</TableHead>
              <TableHead className="w-2/12 text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((student, index) => (
              <TableRow>
                <TableCell className="w-1/12">{index + 1}</TableCell>
                <TableCell className="w-3/12">{student.fullname}</TableCell>
                <TableCell className="w-2/12">{student.student_code}</TableCell>
                <TableCell className="w-2/12">{student.gender}</TableCell>
                <TableCell className="w-2/12">{student.birthday}</TableCell>
                <TableCell className="w-2/12 text-center">X</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div className="flex flex-col mt-4 gap-4">
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
            <p className="w-1/12">STT</p>
            <p className="w-3/12">Họ và tên</p>
            <p className="w-2/12">Mã sinh viên</p>
            <p className="w-2/12">Giới tính</p>
            <p className="w-2/12">Ngày sinh</p>
            <p className="w-2/12">Hành động</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ModuleDetail
