/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Plus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form"
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
import imageEmptyData from "../../../assets/images/empty_data.png"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion"
import { useState } from "react"

interface PopupDetailSubjectProps {
  isShowDetailSubject: boolean
  setIsShowDetailSubject: (value: boolean) => void
  idDetailSubject: string | null
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Tên môn học không được để trống.",
  }),
})

const PopupDetailSubject = ({
  isShowDetailSubject,
  setIsShowDetailSubject,
  idDetailSubject,
}: PopupDetailSubjectProps) => {
  const [listChapter, setListChapter] = useState<any[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div>
      <Dialog open={isShowDetailSubject} onOpenChange={setIsShowDetailSubject}>
        <DialogContent className="min-w-[700px] top-[15%] translate-y-[-15%]">
          <DialogHeader className="border-b pb-8">
            <DialogTitle>Danh sách chương</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Tên chương</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                </TableRow> */}
            </TableBody>
          </Table>
          {listChapter?.length > 0 ? (
            <></>
          ) : (
            <div className="w-full flex flex-col justify-center items-center pb-4 border-b">
              <img src={imageEmptyData} alt="empty" className="w-[160px] object-cover" />
              <TableCaption>Không có dữ liệu</TableCaption>
            </div>
          )}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex gap-2 text-blue-800">
                  <Plus className="size-5" />
                  <span className="hover:no-underline">Thêm chương mới</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Input
                                className="bg-gray-100 w-[400px]"
                                placeholder="Nhập tên chương"
                                {...field}
                              />
                              <Button type="submit" className="bg-blue-800 text-white px-6">
                                Tạo chương
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex justify-end">
            <Button className="bg-blue-800" onClick={() => setIsShowDetailSubject(false)}>
              Thoát
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PopupDetailSubject
