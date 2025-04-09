import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import GoogleIcon from "../../assets/images/google-icon.png"
import LogoSTU from "../../assets/images/Logo_STU.png"
import { Plus, TriangleAlert } from "lucide-react"
import { apiLogin } from "../../services/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import useAuthStore from "../../stores/authStore"
import path from "../../utils/path"

const formSchema = z.object({
  student_code: z.string().min(1, {
    message: "Mã sinh viên không được để trống.",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự.",
  }),
})
const Login = () => {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_code: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await apiLogin(values)
      console.log(response)
      if (response.status === 201) {
        await login(response.data)
        console.log("✅ Zustand current state:", useAuthStore.getState())

        toast.success("Đăng nhập thành công")
        form.reset()
        if (response.data.role.name === "student") navigate(path.STUDENT.OVERVIEW)
        else if (response.data.role.name === "teacher") navigate(path.TEACHER.OVERVIEW)
        else if (response.data.role.name === "admin") navigate(path.ADMIN.OVERVIEW)
        else navigate(path.HOME)
      }
    } catch (error: any) {
      toast.error(error?.response.data.message)
      console.log(error)
    }
  }
  return (
    <div className="flex w-full h-screen">
      <div className="flex-[50%] flex justify-center items-center">
        <div className="w-[400px] flex-col justify-center gap-4">
          <div className="flex flex-col items-center mb-8">
            <div className="text-4xl font-bold flex">
              <img src={LogoSTU} alt="Logo STU" className="w-20" />{" "}
              <div className="text-[#0d4c89] flex flex-col justify-end">
                <p>Test</p>
              </div>
            </div>
            <p className="uppercase font-semibold text-black/70">Đăng nhập</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-4"
            >
              <FormField
                control={form.control}
                name="student_code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          className="bg-gray-100 w-[400px]"
                          placeholder="Nhập mã sinh viên"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          type="password"
                          className="bg-gray-100 w-[400px]"
                          placeholder="Nhập mật khẩu"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-700 text-white px-6"
              >
                Đăng nhập
              </Button>
              <Button
                type="button"
                className="w-full bg-gray-200 hover:bg-gray-300 text-black px-6"
              >
                <img src={GoogleIcon} alt="google" className="w-[20px] h-[20px]" />
                Đăng nhập với Google
              </Button>
              <div className="mt-4 w-full flex items-center justify-between">
                <Button type="button" className="bg-gray-200 hover:bg-gray-300 text-black">
                  <TriangleAlert />
                  Quên mật khẩu
                </Button>
                <Button type="button" className="bg-gray-200 hover:bg-gray-300 text-black">
                  <Plus />
                  New account
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="flex-[50%] bg-blue-800 flex flex-col justify-center items-center">
        <p className="text-4xl text-white font-bold mb-4">Welcome to the STU Test</p>
        <p className="text-white">Copyright@2025</p>
      </div>
    </div>
  )
}

export default Login
