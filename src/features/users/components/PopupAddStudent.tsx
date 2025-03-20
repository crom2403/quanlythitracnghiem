import { Plus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "../../../components/ui/label"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

interface PopupAddSubjectProps {
  isAddStudentModalOpen: boolean
  setIsAddStudentModalOpen: (value: boolean) => void
}

const formManualSchema = z.object({
  student_code: z.string().min(1, {
    message: "Mã môn học không được để trống.",
  }),
  name: z.string().min(1, {
    message: "Họ và tên không được để trống.",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải từ 6 kí tự.",
  }),
  email: z.string(),
  birthday: z.string(),
})

const formFileSchema = z.object({
  password: z.string().min(6, {
    message: "Mật khẩu phải từ 6 kí tự.",
  }),
})

const PopupAddStudent = ({
  isAddStudentModalOpen,
  setIsAddStudentModalOpen,
}: PopupAddSubjectProps) => {
  const [gender, setGender] = useState("")
  const [permission, setPermission] = useState("student")
  const formManual = useForm<z.infer<typeof formManualSchema>>({
    resolver: zodResolver(formManualSchema),
    defaultValues: {
      student_code: "",
      name: "",
      password: "",
      email: "",
      birthday: "",
    },
  })

  const formFile = useForm<z.infer<typeof formManualSchema>>({
    resolver: zodResolver(formManualSchema),
    defaultValues: {
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formManualSchema>) {
    console.log(values)
  }

  return (
    <div>
      <Dialog open={isAddStudentModalOpen} onOpenChange={setIsAddStudentModalOpen}>
        <DialogTrigger>
          <Button
            onClick={() => setIsAddStudentModalOpen(!isAddStudentModalOpen)}
            className="p-2 px-4 bg-blue-800 text-white hover:bg-blue-900"
          >
            <Plus />
            Thêm người dùng
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full p-4 rounded-none border-none">
          <Tabs defaultValue="manual">
            <TabsList>
              <TabsTrigger value="manual">Thêm thủ công</TabsTrigger>
              <TabsTrigger value="file">Thêm từ file</TabsTrigger>
            </TabsList>
            <TabsContent value="manual">
              <div className="h-full p-4">
                <Form {...formManual}>
                  <form onSubmit={formManual.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <p className="font-medium mb-2 text-sm">Mã sinh viên</p>
                      <FormField
                        control={formManual.control}
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
                      <p className="font-medium mb-2 text-sm">Email</p>
                      <FormField
                        control={formManual.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="bg-gray-100"
                                placeholder="Nhập địa chỉ email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <p className="font-medium mb-2 text-sm">Họ và tên</p>
                      <FormField
                        control={formManual.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="bg-gray-100"
                                placeholder="Nhập họ và tên"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      <p className="font-medium text-sm">Giới tính</p>
                      <RadioGroup
                        className="flex gap-2 items-center"
                        defaultValue={gender}
                        value={gender}
                        onValueChange={setGender}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Nam</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Nữ</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <p className="font-medium mb-2 text-sm">Ngày sinh</p>
                      <FormField
                        control={formManual.control}
                        name="birthday"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="bg-gray-100"
                                placeholder="Nhập ngày sinh yyyy-mm-dd"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <p className="font-medium mb-2 text-sm">Nhóm quyền</p>
                      <Select
                        defaultValue={permission}
                        value={permission}
                        onValueChange={setPermission}
                      >
                        <SelectTrigger className="w-full rounded-e-none bg-gray-200 font-bold">
                          <SelectValue placeholder="Nhóm quyền" className="font-bold text-center" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="teacher">Giảng viên</SelectItem>
                          <SelectItem value="student">Sinh viên</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <p className="font-medium mb-2 text-sm">Mật khẩu</p>
                      <FormField
                        control={formManual.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="bg-gray-100"
                                placeholder="Nhập mật khẩu"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() => setIsAddStudentModalOpen(false)}
                      >
                        Đóng
                      </Button>
                      <Button type="submit" className="bg-blue-800 text-white px-6">
                        Lưu
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </TabsContent>
            <TabsContent value="file">
              <Form {...formFile}>
                <form onSubmit={formFile.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <p className="font-medium mb-2 text-sm">Nhập mật khẩu</p>
                    <div>
                      <p className="font-medium mb-2 text-sm">Mật khẩu</p>
                      <FormField
                        control={formManual.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="bg-gray-100"
                                placeholder="Nhập mật khẩu"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PopupAddStudent
