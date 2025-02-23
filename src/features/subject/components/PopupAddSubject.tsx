import { Plus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"

interface PopupAddSubjectProps {
  isAddSubjectModalOpen: boolean
  setIsAddSubjectModalOpen: (value: boolean) => void
}

const formSchema = z.object({
  public_id: z.string().min(1, {
    message: "Mã môn học không được để trống.",
  }),
  name: z.string().min(1, {
    message: "Tên môn học không được để trống.",
  }),
  credits: z
    .string()
    .min(1, { message: "Số tín chỉ không được để trống." })
    .refine((val) => !isNaN(Number(val)), {
      message: "Số tín chỉ phải là một số.",
    })
    .refine((val) => Number(val) > 0, {
      message: "Số tín chỉ phải lớn hơn 0.",
    }),
  theory_hours: z
    .string()
    .min(1, { message: "Số giờ lý thuyết không được để trống." })
    .refine((val) => !isNaN(Number(val)), {
      message: "Số giờ lý thuyết phải là một số.",
    })
    .refine((val) => Number(val) > 0, {
      message: "Số giờ lý thuyết phải lớn hơn 0.",
    }),
  practical_hours: z
    .string()
    .min(1, { message: "Số giờ thực hành không được để trống." })
    .refine((val) => !isNaN(Number(val)), {
      message: "Số giờ thực hành phải là một số.",
    })
    .refine((val) => Number(val) > 0, {
      message: "Số giờ thực hành phải lớn hơn 0.",
    }),
})

const PopupAddSubject = ({
  isAddSubjectModalOpen,
  setIsAddSubjectModalOpen,
}: PopupAddSubjectProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      public_id: "",
      name: "",
      credits: "",
      theory_hours: "",
      practical_hours: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div>
      <Dialog open={isAddSubjectModalOpen} onOpenChange={setIsAddSubjectModalOpen}>
        <DialogTrigger>
          <Button
            onClick={() => setIsAddSubjectModalOpen(!isAddSubjectModalOpen)}
            className="p-2 px-4 bg-blue-800 text-white hover:bg-blue-900"
          >
            <Plus />
            Thêm môn học
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[600px] p-0 rounded-none border-none">
          <DialogHeader className="bg-blue-800 text-white p-2 rounded-t-lg">
            <DialogTitle className="text-md">Thêm môn học</DialogTitle>
          </DialogHeader>
          <div className="h-full p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <p className="font-medium mb-2 text-sm">Mã môn học</p>
                  <FormField
                    control={form.control}
                    name="public_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-slate-100"
                            placeholder="Nhập mã môn học"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <p className="font-medium mb-2 text-sm">Tên môn học</p>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-slate-100"
                            placeholder="Nhập tên môn học"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <p className="font-medium mb-2 text-sm">Tổng số tín chỉ</p>
                  <FormField
                    control={form.control}
                    name="credits"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-slate-100"
                            placeholder="Nhập số tín chỉ"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <p className="font-medium mb-2 text-sm">Số tiết lý thuyết</p>
                    <FormField
                      control={form.control}
                      name="theory_hours"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="bg-slate-100"
                              placeholder="Nhập số tiết lý thuyết"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <p className="font-medium mb-2 text-sm">Số tiết thực hành</p>
                    <FormField
                      control={form.control}
                      name="practical_hours"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="bg-slate-100"
                              placeholder="Nhập số tiết thực hành"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => setIsAddSubjectModalOpen(false)}
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
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PopupAddSubject
