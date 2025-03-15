import { Copy, Plus, RefreshCcw } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
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
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"

const formSchema = z.object({
  student_code: z.string().min(1, {
    message: "Mã sinh viên không được để trống.",
  }),
  name: z.string().min(1, {
    message: "Họ và tên không được để trống.",
  }),
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 kí tự." }),
})

interface PopupAddStudentProps {
  isOpen: boolean
  handleOpen: (value: boolean) => void
}

const PopupAddStudent = ({ isOpen, handleOpen }: PopupAddStudentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_code: "",
      name: "",
      password: "",
    },
  })

  const onSubmit = async () => {}
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-blue-800 text-white">
          <Plus /> Thêm sinh viên
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="manual">
          <TabsList>
            <TabsTrigger value="manual">Thêm thủ công</TabsTrigger>
            <TabsTrigger value="invite_code">Tham gia bằng mã mời</TabsTrigger>
            <TabsTrigger value="excel">Thêm bằng file Excel</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <FormLabel>Mã sinh viên</FormLabel>
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
          <TabsContent value="invite_code" className="min-w-[560px]">
            <div className="h-[160px] flex flex-col justify-between">
              <div className="flex w-full justify-center items-center">
                <p className="text-5xl mt-12">82ec6cb</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs">841059 - Lập trình hướng đối tượng - NH2022 - HK1 - Nhóm 1</p>
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
          <TabsContent value="excel">Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default PopupAddStudent
