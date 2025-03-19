// excel-template-generator.ts
import * as XLSX from "xlsx"

/**
 * Tạo và tải xuống file excel mẫu để import câu hỏi
 */
export function createAndDownloadTemplate() {
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
    ["   - Nội dung câu hỏi: Nội dung câu hỏi (có thể sử dụng HTML cơ bản như <b>, <i>, <u>, <p>)"],
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
}
