import { useState, useEffect } from "react"

import DOMPurify from "dompurify"
import QuillEditor from "./QuillEditor"
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { ChevronDown, Download, File, Pencil, Plus, Trash, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Label } from "../../components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { toast } from "sonner"
import { Alert, AlertDescription } from "../../components/ui/alert"
import * as XLSX from "xlsx"

interface PopupAddQuestionProps {
  isOpen: boolean
  handleOpen: (value: boolean) => void
  onQuestionAdded?: (question: QuestionType) => void
}

type ListAnswerType = {
  id: number
  content: string
  is_correct: boolean
}

type QuestionType = {
  id: string
  content: string
  answers: ListAnswerType[]
  subject: string
  chapter: string
  difficulty: string
}

const PopupAddQuestion = ({ isOpen, handleOpen, onQuestionAdded }: PopupAddQuestionProps) => {
  const [content, setContent] = useState("")
  const [contentAnswer, setContentAnswer] = useState("")
  const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null)
  const [isAnswerCheckCorrect, setIsAnswerCheckCorrect] = useState(false)

  const [activeTab, setActiveTab] = useState("manual")
  const [listAnswer, setListAnswer] = useState<ListAnswerType[]>([])

  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")
  const [difficulty, setDifficulty] = useState("")

  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState("")
  const [formErrors, setFormErrors] = useState({
    content: "",
    subject: "",
    chapter: "",
    difficulty: "",
    answers: "",
  })

  // Mock data for subjects and chapters
  const listSubject = [
    { id: "math", name: "Toán học" },
    { id: "physics", name: "Vật lý" },
    { id: "chemistry", name: "Hóa học" },
    { id: "biology", name: "Sinh học" },
  ]

  const listChapter = {
    math: [
      { id: "math_1", name: "Đại số" },
      { id: "math_2", name: "Hình học" },
      { id: "math_3", name: "Giải tích" },
    ],
    physics: [
      { id: "physics_1", name: "Cơ học" },
      { id: "physics_2", name: "Điện học" },
      { id: "physics_3", name: "Quang học" },
    ],
    chemistry: [
      { id: "chem_1", name: "Hóa vô cơ" },
      { id: "chem_2", name: "Hóa hữu cơ" },
    ],
    biology: [
      { id: "bio_1", name: "Sinh học tế bào" },
      { id: "bio_2", name: "Di truyền học" },
    ],
  }

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const resetForm = () => {
    setContent("")
    setContentAnswer("")
    setListAnswer([])
    setSubject("")
    setChapter("")
    setDifficulty("")
    setFile(null)
    setFileError("")
    setFormErrors({
      content: "",
      subject: "",
      chapter: "",
      difficulty: "",
      answers: "",
    })
    setEditingAnswerId(null)
    setIsAnswerCheckCorrect(false)
  }

  const handleResetAnswer = () => {
    setContentAnswer("")
    setIsAnswerCheckCorrect(false)
    setEditingAnswerId(null)
  }

  const validateForm = () => {
    let isValid = true
    const errors = {
      content: "",
      subject: "",
      chapter: "",
      difficulty: "",
      answers: "",
    }

    if (!content.trim()) {
      errors.content = "Vui lòng nhập nội dung câu hỏi"
      isValid = false
    }

    if (!subject) {
      errors.subject = "Vui lòng chọn môn học"
      isValid = false
    }

    if (!chapter) {
      errors.chapter = "Vui lòng chọn chương"
      isValid = false
    }

    if (!difficulty) {
      errors.difficulty = "Vui lòng chọn độ khó"
      isValid = false
    }

    if (listAnswer.length < 2) {
      errors.answers = "Vui lòng thêm ít nhất 2 đáp án"
      isValid = false
    }

    const hasCorrectAnswer = listAnswer.some((answer) => answer.is_correct)
    if (!hasCorrectAnswer && listAnswer.length > 0) {
      errors.answers = "Vui lòng chọn ít nhất 1 đáp án đúng"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleAddAnswer = () => {
    if (!contentAnswer.trim()) {
      toast.error("Vui lòng nhập nội dung đáp án")
      return
    }

    if (editingAnswerId !== null) {
      // Updating existing answer
      const updatedAnswers = listAnswer.map((answer) =>
        answer.id === editingAnswerId
          ? { ...answer, content: contentAnswer, is_correct: isAnswerCheckCorrect }
          : answer
      )
      setListAnswer(updatedAnswers)
      toast.success("Đã cập nhật đáp án")
    } else {
      // Adding new answer
      setListAnswer([
        ...listAnswer,
        {
          id: Date.now(), // Use timestamp as unique ID
          content: contentAnswer,
          is_correct: isAnswerCheckCorrect,
        },
      ])
      toast.success("Đã thêm đáp án mới")
    }

    handleResetAnswer()
  }

  const handleEditAnswer = (answer: ListAnswerType) => {
    setContentAnswer(answer.content)
    setIsAnswerCheckCorrect(answer.is_correct)
    setEditingAnswerId(answer.id)
  }

  const handleDeleteAnswer = (id: number) => {
    setListAnswer(listAnswer.filter((answer) => answer.id !== id))
    if (editingAnswerId === id) {
      handleResetAnswer()
    }
    toast.success("Đã xóa đáp án")
  }

  const handleSetCorrectAnswer = (id: number) => {
    setListAnswer(
      listAnswer.map((answer) => ({
        ...answer,
        is_correct: answer.id === id,
      }))
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) {
      setFile(null)
      return
    }

    // Check file type (only allow .xlsx, .xls, .csv)
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
      "text/csv", // .csv
    ]

    if (!allowedTypes.includes(selectedFile.type)) {
      setFileError("Chỉ chấp nhận file Excel (.xlsx, .xls) hoặc CSV (.csv)")
      setFile(null)
      return
    }

    setFile(selectedFile)
    setFileError("")
  }

  const handleImportFile = () => {
    if (!file) {
      setFileError("Vui lòng chọn file để import")
      return
    }

    // Here you would process the file, for example:
    // const formData = new FormData()
    // formData.append('file', file)
    // API call to upload and process the file

    toast.success(`Đã nhập file ${file.name}`)

    // For demonstration, we'll just show a success message
    handleOpen(false)
  }

  const downloadTemplate = () => {
    try {
      // Tạo workbook
      const wb = XLSX.utils.book_new()

      // ===== Sheet Hướng dẫn =====
      const instructionData = [
        ["HƯỚNG DẪN SỬ DỤNG FILE MẪU IMPORT CÂU HỎI"],
        [""],
        ["1. Cấu trúc file"],
        ["   - File gồm 2 sheet: 'Hướng dẫn' và 'Câu hỏi'"],
        ["   - Sheet 'Câu hỏi' chứa dữ liệu câu hỏi cần import"],
        [""],
        ["2. Các cột trong sheet 'Câu hỏi'"],
        ["   - STT: Số thứ tự câu hỏi (chỉ để đánh số, không ảnh hưởng đến quá trình import)"],
        ["   - Mã môn học: Sử dụng các mã sau"],
        ["      + math: Toán học"],
        ["      + physics: Vật lý"],
        ["      + chemistry: Hóa học"],
        ["      + biology: Sinh học"],
        [""],
        ["   - Mã chương: Sử dụng các mã sau tương ứng với môn học"],
        ["      + Toán học: math_1 (Đại số), math_2 (Hình học), math_3 (Giải tích)"],
        ["      + Vật lý: physics_1 (Cơ học), physics_2 (Điện học), physics_3 (Quang học)"],
        ["      + Hóa học: chem_1 (Hóa vô cơ), chem_2 (Hóa hữu cơ)"],
        ["      + Sinh học: bio_1 (Sinh học tế bào), bio_2 (Di truyền học)"],
        [""],
        ["   - Độ khó: Sử dụng các giá trị: easy (Dễ), medium (Trung bình), hard (Khó)"],
        [""],
        [
          "   - Nội dung câu hỏi: Nội dung câu hỏi (có thể sử dụng HTML cơ bản như <b>, <i>, <u>, <p>)",
        ],
        [""],
        ["   - Đáp án A, B, C, D: Nội dung các đáp án (tối thiểu phải có 2 đáp án A và B)"],
        [""],
        ["   - Đáp án đúng: Đánh dấu đáp án đúng bằng chữ cái tương ứng (A, B, C, D)"],
        ["      + Nếu có nhiều đáp án đúng, sử dụng dấu phẩy để phân cách (Ví dụ: A,C)"],
        [""],
        ["3. Lưu ý"],
        ["   - Không thay đổi tên các cột"],
        [
          "   - Không để trống các cột bắt buộc (Mã môn học, Mã chương, Độ khó, Nội dung câu hỏi, Đáp án A, Đáp án B, Đáp án đúng)",
        ],
        ["   - Độ khó phải là một trong ba giá trị: easy, medium, hard"],
        ["   - Mã môn học và mã chương phải khớp với danh sách đã cung cấp"],
      ]

      const instructionWs = XLSX.utils.aoa_to_sheet(instructionData)

      // Chỉnh độ rộng cột
      const instructionColWidth = [{ wch: 80 }] // Độ rộng cột đầu tiên
      instructionWs["!cols"] = instructionColWidth

      // Thêm sheet Hướng dẫn vào workbook
      XLSX.utils.book_append_sheet(wb, instructionWs, "Hướng dẫn")

      // ===== Sheet Câu hỏi =====
      const headers = [
        "STT",
        "Mã môn học",
        "Mã chương",
        "Độ khó",
        "Nội dung câu hỏi",
        "Đáp án A",
        "Đáp án B",
        "Đáp án C",
        "Đáp án D",
        "Đáp án đúng",
      ]

      const exampleData = [
        [1, "math", "math_1", "easy", "Tính 2 + 2 = ?", "3", "4", "5", "6", "B"],
        [
          2,
          "math",
          "math_2",
          "medium",
          "Diện tích hình vuông cạnh 5cm là bao nhiêu?",
          "20cm²",
          "25cm²",
          "15cm²",
          "10cm²",
          "B",
        ],
        [
          3,
          "physics",
          "physics_1",
          "hard",
          "Công thức tính động năng là?",
          "E = mc²",
          "W = F.d",
          "E = mgh",
          "E = (1/2)mv²",
          "D",
        ],
        [
          4,
          "chemistry",
          "chem_1",
          "medium",
          "Nguyên tố nào có ký hiệu Fe?",
          "Sắt",
          "Đồng",
          "Nhôm",
          "Kẽm",
          "A",
        ],
        [
          5,
          "biology",
          "bio_1",
          "easy",
          "Bộ phận nào được gọi là 'nhà máy năng lượng' của tế bào?",
          "Nhân tế bào",
          "Ty thể",
          "Ribosome",
          "Không bào",
          "B",
        ],
      ]

      // Tạo sheet từ dữ liệu
      const data = [headers, ...exampleData]
      const ws = XLSX.utils.aoa_to_sheet(data)

      // Chỉnh độ rộng cột
      const colWidth = [
        { wch: 5 }, // STT
        { wch: 15 }, // Mã môn học
        { wch: 15 }, // Mã chương
        { wch: 10 }, // Độ khó
        { wch: 40 }, // Nội dung câu hỏi
        { wch: 20 }, // Đáp án A
        { wch: 20 }, // Đáp án B
        { wch: 20 }, // Đáp án C
        { wch: 20 }, // Đáp án D
        { wch: 15 }, // Đáp án đúng
      ]
      ws["!cols"] = colWidth

      // Thêm sheet Câu hỏi vào workbook
      XLSX.utils.book_append_sheet(wb, ws, "Câu hỏi")

      // Tạo file excel
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" })

      // Chuyển đổi dữ liệu nhị phân thành đối tượng Blob
      function s2ab(s: string) {
        const buf = new ArrayBuffer(s.length)
        const view = new Uint8Array(buf)
        for (let i = 0; i < s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xff
        }
        return buf
      }

      // Tạo đối tượng Blob
      const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" })

      // Tạo URL từ Blob
      const url = URL.createObjectURL(blob)

      // Tạo thẻ a để tải xuống
      const a = document.createElement("a")
      a.href = url
      a.download = "cau_hoi_mau.xlsx"
      document.body.appendChild(a)
      a.click()

      // Dọn dẹp
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 0)

      toast.success("Đã tải xuống file mẫu")
    } catch (error) {
      console.error("Lỗi khi tạo file Excel:", error)
      toast.error("Không thể tạo file mẫu, vui lòng thử lại sau")
    }
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại các trường bắt buộc")
      return
    }

    const newQuestion: QuestionType = {
      id: Date.now().toString(),
      content,
      answers: listAnswer,
      subject,
      chapter,
      difficulty,
    }

    // Here you would save the question to your backend
    console.log("Câu hỏi mới:", newQuestion)

    if (onQuestionAdded) {
      onQuestionAdded(newQuestion)
    }

    toast.success("Đã lưu câu hỏi mới")

    handleOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-800 text-white">
          <Plus className="mr-2" /> Thêm câu hỏi mới
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm câu hỏi mới</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="manual">Thêm thủ công</TabsTrigger>
            <TabsTrigger value="from_file">Thêm từ file</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <div className="flex gap-4 items-center mt-4 flex-wrap">
              <Select value={subject} onValueChange={setSubject}>
                <div className="flex flex-col gap-2">
                  <Label>
                    Môn học <span className="text-red-500">*</span>
                  </Label>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Chọn môn học" />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  {listSubject.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.subject && <p className="text-red-500 text-sm">{formErrors.subject}</p>}

              <Select value={chapter} onValueChange={setChapter} disabled={!subject}>
                <div className="flex flex-col gap-2">
                  <Label>
                    Chương <span className="text-red-500">*</span>
                  </Label>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Chọn chương" />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  {subject &&
                    listChapter[subject as keyof typeof listChapter]?.map((chap) => (
                      <SelectItem key={chap.id} value={chap.id}>
                        {chap.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {formErrors.chapter && <p className="text-red-500 text-sm">{formErrors.chapter}</p>}

              <Select value={difficulty} onValueChange={setDifficulty}>
                <div className="flex flex-col gap-2">
                  <Label>
                    Độ khó <span className="text-red-500">*</span>
                  </Label>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Chọn độ khó" />
                  </SelectTrigger>
                </div>
                <SelectContent>
                  <SelectItem value="easy">Dễ</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="hard">Khó</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.difficulty && (
                <p className="text-red-500 text-sm">{formErrors.difficulty}</p>
              )}
            </div>

            <div className="mt-4">
              <QuillEditor
                value={content}
                onChange={setContent}
                placeholder="Nội dung câu hỏi..."
                className="mb-14"
              />
              {formErrors.content && (
                <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>
              )}
            </div>

            <div className="block w-full h-full mt-4">
              <div className="flex justify-between items-center mb-2">
                <Label>
                  Danh sách đáp án <span className="text-red-500">*</span>
                </Label>
                {formErrors.answers && <p className="text-red-500 text-sm">{formErrors.answers}</p>}
              </div>

              {listAnswer.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">STT</TableHead>
                      <TableHead>Nội dung</TableHead>
                      <TableHead className="w-40">Đáp án đúng</TableHead>
                      <TableHead className="w-24">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listAnswer.map((answer, index) => (
                      <TableRow key={answer.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer.content) }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 items-center">
                            <input
                              type="radio"
                              checked={answer.is_correct}
                              onChange={() => handleSetCorrectAnswer(answer.id)}
                              className="size-4 hover:cursor-pointer"
                            />
                            <p>Đáp án đúng</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 items-center">
                            <Pencil
                              className="size-4 hover:text-orange-600 hover:cursor-pointer"
                              onClick={() => handleEditAnswer(answer)}
                            />
                            <Trash
                              className="size-4 hover:text-red-600 hover:cursor-pointer"
                              onClick={() => handleDeleteAnswer(answer.id)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 text-center border rounded-sm">
                  <p className="text-gray-500 text-sm italic">Chưa có đáp án nào</p>
                </div>
              )}
            </div>

            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Button className="bg-blue-800 text-white">
                    {editingAnswerId !== null ? "Cập nhật đáp án" : "Thêm đáp án"}{" "}
                    <ChevronDown className="ml-2" />
                  </Button>
                </AccordionTrigger>
                <AccordionContent>
                  <QuillEditor
                    value={contentAnswer}
                    onChange={setContentAnswer}
                    label="Nội dung đáp án"
                    className="mb-14"
                    height="100px"
                  />
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      checked={isAnswerCheckCorrect}
                      onChange={() => setIsAnswerCheckCorrect(!isAnswerCheckCorrect)}
                      className="size-4 hover:cursor-pointer"
                      id="correct-answer"
                    />
                    <Label htmlFor="correct-answer">Đáp án đúng</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-blue-800 text-white" onClick={handleAddAnswer}>
                      {editingAnswerId !== null ? "Cập nhật" : "Lưu câu trả lời"}
                    </Button>
                    {editingAnswerId !== null && (
                      <Button variant="outline" onClick={handleResetAnswer}>
                        Hủy chỉnh sửa
                      </Button>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex items-center justify-end mt-6">
              <Button className="bg-blue-800 text-white flex gap-2" onClick={handleSubmit}>
                <Plus />
                Lưu câu hỏi
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="from_file">
            <div className="p-4 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Label>Tải lên file Excel/CSV</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                      className="w-96"
                    />
                    <Button
                      className="bg-blue-800 text-white"
                      onClick={handleImportFile}
                      disabled={!file}
                    >
                      <Upload className="mr-2" />
                      Import
                    </Button>
                  </div>
                  {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
                  {file && <p className="text-green-600 text-sm">Đã chọn file: {file.name}</p>}
                </div>

                <Button variant="outline" onClick={downloadTemplate}>
                  <Download className="mr-2" />
                  Tải file mẫu
                </Button>
              </div>

              <Alert>
                <File className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-semibold mb-2">Hướng dẫn import câu hỏi từ file:</p>

                  <ol className="list-decimal ml-6 space-y-1 text-sm">
                    <li>Tải file mẫu và điền thông tin câu hỏi theo định dạng có sẵn</li>
                    <li>
                      File phải có các cột: Môn học, Chương, Độ khó, Nội dung câu hỏi, Đáp án (nhiều
                      cột), Đáp án đúng
                    </li>
                    <li>Đáp án đúng được đánh dấu bằng số thứ tự của đáp án (1, 2, 3, 4, ...)</li>
                    <li>Chỉ chấp nhận file Excel (.xlsx, .xls) hoặc CSV (.csv)</li>
                    <li>Kích thước file tối đa 5MB</li>
                  </ol>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default PopupAddQuestion
