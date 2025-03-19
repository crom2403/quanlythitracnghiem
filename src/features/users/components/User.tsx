/* eslint-disable @typescript-eslint/no-unused-vars */
import { Info, Pencil, Plus, Search, X } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination"
import BadgeCustom from "../../../components/common/BadgeCustom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Input } from "../../../components/ui/input"

const mockdata = [
  {
    id: 1,
    student_code: "DH52106677",
    name: "Trần Thanh Sơn",
    gender: "Nam",
    birthday: "2002-03-24",
    email: "abc@gmail.com",
    role_name: "Admin",
    created_at: "2025-03-18",
    active: true,
  },
  {
    id: 2,
    student_code: "DH52106678",
    name: "Nguyễn Văn A",
    gender: "Nam",
    birthday: "2002-03-24",
    email: "abcsssssssssssss@gmail.com",
    role_name: "Giảng viên",
    created_at: "2025-03-18",
    active: true,
  },
  {
    id: 3,
    student_code: "DH52106677",
    name: "Trần Thị B",
    gender: "Nữ",
    birthday: "2002-03-24",
    email: "",
    role_name: "Sinh viên",
    created_at: "2025-03-18",
    active: true,
  },
  {
    id: 4,
    student_code: "DH52106677",
    name: "Trần Văn F",
    gender: "Nam",
    birthday: "2002-03-24",
    email: "absssc@gmail.com",
    role_name: "Sinh viên",
    created_at: "2025-03-18",
    active: false,
  },
]

const User = () => {
  return (
    <>
      <div className="w-full min-h-[560px] bg-white rounded-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Tất cả người dùng</h1>
          <Button>
            <Plus />
            Thêm người dùng
          </Button>
        </div>
        <div className="relative my-6">
          <div className="max-w-[300px] flex items-center">
            <Select>
              <SelectTrigger className="min-w-[120px] rounded-e-none bg-gray-200 font-bold">
                <SelectValue placeholder="Tất cả" className="font-bold text-center" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" defaultChecked>
                  Tất cả
                </SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="teacher">Giảng viên</SelectItem>
                <SelectItem value="student">Sinh viên</SelectItem>
              </SelectContent>
            </Select>
            <Input className="rounded-s-none min-w-[320px]" placeholder="Tìm kiếm người dùng..." />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[110px] text-black/80 font-semibold">MSSV</TableHead>
              <TableHead className="text-black/80 font-semibold">Họ và Tên</TableHead>
              <TableHead className="text-center text-black/80 font-semibold">Giới tính</TableHead>
              <TableHead className="text-center text-black/80 font-semibold">Ngày sinh</TableHead>
              <TableHead className="text-center text-black/80 font-semibold">Nhóm quyền</TableHead>
              <TableHead className="text-center text-black/80 font-semibold">
                Ngày tham gia
              </TableHead>
              <TableHead className="text-center text-black/80 font-semibold">Trạng thái</TableHead>
              <TableHead className="text-center text-black/80 font-semibold">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockdata.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.student_code}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="size-9 rounded-full bg-slate-500"></div>
                      <div className="flex flex-col">
                        <p className="text-blue-800 font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center w-[100px]">{item.gender}</TableCell>
                  <TableCell className="text-center">{item.birthday}</TableCell>
                  <TableCell className="text-center">{item.role_name}</TableCell>
                  <TableCell className="text-center">{item.created_at}</TableCell>
                  <TableCell className="text-center">
                    <BadgeCustom
                      type={item.active ? "active" : "block"}
                      text={item.active ? "Hoạt động" : "Khóa"}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button className="p-2 bg-gray-100 text-black mr-2 hover:bg-gray-200">
                      <Pencil />
                    </Button>
                    <Button className="p-2 bg-gray-100 text-black hover:bg-gray-200">
                      <X />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Pagination className="justify-end mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" size="default" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="default">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" size="default" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default User
