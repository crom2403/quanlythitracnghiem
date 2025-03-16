import { Pencil, Plus, Search, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import PopupAddQuestion from "./PopupAddQuestion"

const mockData = [
  {
    id: 1,
    content: "OOP là viết tắt của:",
    subject: {
      id: 1,
      name: "Lập trình hướng đối tượng",
    },
    difficulty_level: "Cơ bản",
  },
  {
    id: 2,
    content: "Đặt điểm cơ bản của hướng đối tượng thể hiện ở:",
    subject: {
      id: 1,
      name: "Lập trình hướng đối tượng",
    },
    difficulty_level: "Trung bình",
  },
  {
    id: 3,
    content: `Trong java, khi khai báo một thuộc tỉnh hoặc một hàm của một lớp mà
     không có từ khóa quyền truy cập thì mặc định quyền truy cập là gì?`,
    subject: {
      id: 1,
      name: "Lập trình hướng đối tượng",
    },
    difficulty_level: "Khó",
  },
]

const Question = () => {
  const [selectSubject, setSelectSubject] = useState("")
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const listSubject = [
    {
      id: 1,
      name: "Lập trình hướng đối tượng",
    },
    {
      id: 2,
      name: "Cơ sở dữ liệu",
    },
  ]

  const listChapter = [
    {
      id: 1,
      name: "Chương 1",
    },
    {
      id: 2,
      name: "Chương 2",
    },
  ]

  return (
    <div>
      <div className="w-full bg-white p-4 rounded-md shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-medium">Tất cả câu hỏi</p>
          <PopupAddQuestion isOpen={isOpenPopup} handleOpen={setIsOpenPopup} />
        </div>
        <div className="flex gap-4 items-center mt-4">
          <Select value={selectSubject} onValueChange={() => setSelectSubject}>
            <SelectTrigger className="w-[400px]">
              <SelectValue placeholder="Chọn môn học" />
            </SelectTrigger>
            <SelectContent>
              {listSubject?.map((sub: any) => (
                <SelectItem value={sub.id}>{sub.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Chọn chương" />
            </SelectTrigger>
            <SelectContent>
              {listSubject?.map((sub: any) => (
                <SelectItem value={sub.id}>{sub.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <div className="flex items-center gap-2">
              <p>Độ khó:</p>
              <SelectTrigger className="w-[140px] ">
                <SelectValue placeholder="Chọn chương" />
              </SelectTrigger>
            </div>

            <SelectContent>
              <SelectItem value="easy">Dễ</SelectItem>
              <SelectItem value="medium">Trung bình</SelectItem>
              <SelectItem value="hard">Khó</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center my-4">
          <Button className="shadow-sm px-[10px] border border-r-0 rounded-e-none bg-white text-black hover:bg-slate-50">
            <Search className="size-2" />
          </Button>
          <Input placeholder="Nội dung câu hỏi" className="min-w-[300px] bg-white rounded-l-none" />
        </div>
        <Table>
          <TableCaption>Không có dữ liệu</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12 text-center">ID</TableHead>
              <TableHead className="w-6/12">Nội dung câu hỏi</TableHead>
              <TableHead className="w-3/12">Môn học</TableHead>
              <TableHead className="w-1/12">Độ khó</TableHead>
              <TableHead className="w-1/12 text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData?.map((ques: any) => (
              <TableRow>
                <TableCell className="text-blue-800 text-center">{ques.id}</TableCell>
                <TableCell>{ques.content}</TableCell>
                <TableCell className="text-blue-800">{ques.subject.name}</TableCell>
                <TableCell>{ques.difficulty_level}</TableCell>
                <TableCell>
                  <Button className="p-2 bg-gray-100 text-black mr-2 hover:bg-gray-200">
                    <Pencil />
                  </Button>
                  <Button className="p-2 bg-gray-100 text-black hover:bg-gray-200">
                    <X />
                  </Button>
                </TableCell>
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

export default Question
