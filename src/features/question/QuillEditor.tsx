import React, { useState, useEffect } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Label } from "../../components/ui/label"

// Định nghĩa kiểu props cho component
interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  className?: string
  height?: string
}

// Định nghĩa các module cơ bản cần sử dụng
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
}

// Định nghĩa các định dạng cơ bản cần sử dụng
const formats = ["header", "bold", "italic", "underline", "list", "bullet", "link"]

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  label,
  placeholder = "Bắt đầu nhập nội dung...",
  className = "",
  height = "200px",
}) => {
  // State để lưu giá trị của editor
  const [editorValue, setEditorValue] = useState(value)

  // Cập nhật giá trị khi prop value thay đổi
  useEffect(() => {
    setEditorValue(value)
  }, [value])

  // Xử lý khi nội dung thay đổi
  const handleChange = (content: string) => {
    setEditorValue(content)
    onChange(content)
  }

  // Tắt kiểm tra chính tả cho editor
  useEffect(() => {
    // Tìm element của Quill editor sau khi nó được render
    const quillEditor = document.querySelector(".ql-editor")
    if (quillEditor) {
      // Tắt kiểm tra chính tả
      quillEditor.setAttribute("spellcheck", "false")
    }
  }, [])

  return (
    <div className={`flex flex-col w-full h-full ${className}`}>
      {label && <Label className="mb-2 block">{label}</Label>}
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{
          height: height,
          borderRadius: "0.375rem",
        }}
      />
    </div>
  )
}

export default QuillEditor
