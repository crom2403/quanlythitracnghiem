// src/components/FormWithEditor.tsx
import { useState } from "react"

import QuillEditor from "./QuillEditor"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

const FormWithEditor = () => {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý dữ liệu form, ví dụ: gửi đến API
    console.log("Nội dung:", content)
    alert("Đã lưu nội dung!")
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Biên tập nội dung</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <QuillEditor value={content} onChange={setContent} label="Nội dung" height="300px" />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => setContent("")}>
            Xóa
          </Button>
          <Button type="submit">Lưu</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default FormWithEditor
