/* eslint-disable @typescript-eslint/no-unused-vars */
import { Info, Pencil, Search, X } from "lucide-react"
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
import { useState } from "react"
import PopupAddSubject from "./PopupAddSubject"

const mockdata = [
  {
    id: 1,
    public_id: "CS03021",
    name: "Computer Science",
    credits: 3,
    theory_hours: 30,
    practical_hours: 30,
  },
  {
    id: 2,
    public_id: "CS03021",
    name: "Computer Science",
    credits: 3,
    theory_hours: 30,
    practical_hours: 30,
  },
  {
    id: 3,
    public_id: "CS03021",
    name: "Computer Science",
    credits: 3,
    theory_hours: 30,
    practical_hours: 30,
  },
  {
    id: 4,
    public_id: "CS03021",
    name: "Computer Science",
    credits: 3,
    theory_hours: 30,
    practical_hours: 30,
  },
  {
    id: 5,
    public_id: "CS03021",
    name: "Computer Science",
    credits: 3,
    theory_hours: 30,
    practical_hours: 30,
  },
]

const Subject = () => {
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState<boolean>(false)
  //   const [isEditSubjectModalOpen, setIsEditSubjectModalOpen] = useState(false)

  return (
    <>
      <div className="w-full min-h-[560px] bg-white rounded-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Danh sách môn học</h1>
          <PopupAddSubject
            isAddSubjectModalOpen={isAddSubjectModalOpen}
            setIsAddSubjectModalOpen={setIsAddSubjectModalOpen}
          />
        </div>
        <div className="relative my-6">
          <input
            type="text"
            placeholder="Tìm kiếm môn học"
            className="w-full px-4 py-2 mt-4 border border-gray-300 rounded-md bg-gray-100"
          />
          <div>
            <Search className="size-5 absolute top-[46%] right-4" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã môn</TableHead>
              <TableHead>Tên môn</TableHead>
              <TableHead className="text-center">Số tín chỉ</TableHead>
              <TableHead className="text-center">Số tiết lý thuyết</TableHead>
              <TableHead className="text-center">Số tiết thực hành</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockdata.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.public_id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-center">{item.credits}</TableCell>
                  <TableCell className="text-center">{item.theory_hours}</TableCell>
                  <TableCell className="text-center">{item.practical_hours}</TableCell>
                  <TableCell className="text-center">
                    <Button className="p-2 bg-gray-100 text-black mr-2 hover:bg-gray-200">
                      <Info />
                    </Button>
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

export default Subject
