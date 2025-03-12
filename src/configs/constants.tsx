import {
  AlignStartVertical,
  CircleHelp,
  File,
  FileText,
  Folder,
  Handshake,
  MessageCircle,
  Rocket,
  UserCog,
  Users,
} from "lucide-react"
import path from "../utils/path"

export const sidebar_admin = [
  {
    group: "",
    items: [
      {
        icon: <Rocket />,
        title: "Tổng quan",
        to: path.HOME,
      },
    ],
  },
  {
    group: "SINH VIÊN",
    items: [
      {
        icon: <Users />,
        title: "Học phần",
        to: path.SUBJECT,
      },
      {
        icon: <FileText />,
        title: "Đề thi",
        to: path.TEST,
      },
    ],
  },
  {
    group: "QUẢN LÝ",
    items: [
      {
        icon: <AlignStartVertical />,
        title: "Nhóm học phần",
        to: path.MODULE,
      },
      {
        icon: <CircleHelp />,
        title: "Câu hỏi",
        to: path.QUESTION,
      },
      {
        icon: <CircleHelp />,
        title: "Người dùng",
        to: path.USER,
      },
      {
        icon: <Folder />,
        title: "Môn học",
        to: path.SUBJECT,
      },
      {
        icon: <Handshake />,
        title: "Phân công",
        to: path.ASSIGNMENT,
      },
      {
        icon: <File />,
        title: "Đề kiểm tra",
        to: "#",
      },
      {
        icon: <MessageCircle />,
        title: "Thông báo",
        to: path.NOTIFICATION,
      },
    ],
  },
  {
    group: "QUẢN TRỊ",
    items: [
      {
        icon: <UserCog />,
        title: "Nhóm quyền",
        to: path.GROUP_PERMISSION,
      },
    ],
  },
]
