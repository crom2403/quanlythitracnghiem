import { Copy, FileUp, Plus, RefreshCcw } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { useRef, useState } from "react"

const formAddStudentManualSchema = z.object({
  student_code: z.string().min(1, {
    message: "Mã sinh viên không được để trống.",
  }),
  name: z.string().min(1, {
    message: "Họ và tên không được để trống.",
  }),
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 kí tự." }),
})

const formAddStudentExcelSchema = z.object({
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 kí tự." }),
})

interface PopupAddStudentProps {
  isOpen: boolean
  handleOpen: (value: boolean) => void
}

const PopupAddStudent = ({ isOpen, handleOpen }: PopupAddStudentProps) => {
  const [activeTab, setActiveTab] = useState("manual")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = useState("No file chosen")

  const handleButtonClick = () => {
    fileInputRef?.current?.click()
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName("No file change")
    }
  }

  const formAddStudentManual = useForm<z.infer<typeof formAddStudentManualSchema>>({
    resolver: zodResolver(formAddStudentManualSchema),
    defaultValues: {
      student_code: "",
      name: "",
      password: "",
    },
  })

  const formAddStudentExcel = useForm<z.infer<typeof formAddStudentExcelSchema>>({
    resolver: zodResolver(formAddStudentExcelSchema),
    defaultValues: {
      password: "",
    },
  })

  const handleDownloadFileExample = () => {
    const fileUrl = "/example.pdf" // Đường dẫn đến file trong thư mục public
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = "example.pdf" // Tên file khi tải về
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const onSubmitFromAddStudentManual = async () => {}
  const onSubmitFromAddStudentExcel = async () => {}
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger>
        <Button className="bg-blue-800 text-white">
          <Plus /> Thêm sinh viên
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${
          activeTab === "manual" || activeTab === "excel" ? "min-w-[540px]" : "min-w-[700px]"
        }`}
      >
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="manual">Thêm thủ công</TabsTrigger>
            <TabsTrigger value="invite_code">Tham gia bằng mã mời</TabsTrigger>
            <TabsTrigger value="excel">Thêm bằng file Excel</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <Form {...formAddStudentManual}>
              <form
                onSubmit={formAddStudentManual.handleSubmit(onSubmitFromAddStudentManual)}
                className="space-y-4"
              >
                <div>
                  <FormLabel>Mã sinh viên</FormLabel>
                  <FormField
                    control={formAddStudentManual.control}
                    name="student_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-gray-100"
                            placeholder="Nhập mã sinh viên"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormField
                    control={formAddStudentManual.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-gray-100"
                            placeholder="Nhập họ tên sinh viên"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormField
                    control={formAddStudentManual.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-gray-100" placeholder="Nhập mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant={"ghost"} onClick={() => handleOpen(false)}>
                    Đóng
                  </Button>
                  <Button type="submit" className="bg-blue-800 text-white px-6">
                    Thêm sinh viên
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="invite_code">
            <div className="h-[160px] flex flex-col justify-between">
              <div className="flex w-full justify-center items-center">
                <p className="text-5xl mt-12">82ec6cb</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-base">
                841059 - Lập trình hướng đối tượng - NH2022 - HK1 - Nhóm 1
              </p>
              <div className="flex gap-1">
                <Button className="px-2 py-0 bg-blue-800/40">
                  <Copy className="text-blue-800" />
                </Button>
                <Button className="bg-blue-800/40 text-blue-800">
                  <RefreshCcw /> Tạo mã mới
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="excel">
            <Form {...formAddStudentExcel}>
              <form
                onSubmit={formAddStudentExcel.handleSubmit(onSubmitFromAddStudentExcel)}
                className="space-y-4"
              >
                <div>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormField
                    control={formAddStudentExcel.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-gray-100"
                            placeholder="Nhập mật khẩu cho sinh viên !"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Nội dung</FormLabel>
                  <div className="flex items-center">
                    <Button
                      onClick={handleButtonClick}
                      className="shadow-sm px-4 border border-r-0 rounded-e-none bg-white text-black hover:bg-slate-50"
                    >
                      Chọn tệp
                    </Button>
                    <Input
                      value={fileName}
                      readOnly
                      placeholder="Tìm kiếm sinh viên"
                      className=" min-w-[300px] bg-white rounded-l-none"
                    />
                    <Input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex text-sm mt-2">
                    <p className="italic text-black/50">
                      Vui lòng soạn người dùng theo đúng định dạng.
                    </p>
                    <p
                      onClick={handleDownloadFileExample}
                      className="hover:cursor-pointer italic text-blue-800  hover:text-blue-700"
                    >
                      Tải về file mẫu Docx
                    </p>
                  </div>
                </div>

                <div className="flex justify-start gap-2">
                  <Button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white px-6">
                    <FileUp /> Thêm sinh viên
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default PopupAddStudent
