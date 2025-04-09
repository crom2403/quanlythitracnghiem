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
        to: path.ADMIN.OVERVIEW,
      },
    ],
  },
  {
    group: "QUẢN LÝ",
    items: [
      {
        icon: <AlignStartVertical />,
        title: "Nhóm học phần",
        to: path.ADMIN.STUDY_GROUP,
      },
      {
        icon: <CircleHelp />,
        title: "Câu hỏi",
        to: path.ADMIN.QUESTION,
      },
      {
        icon: <Users />,
        title: "Người dùng",
        to: path.ADMIN.USER,
      },
      {
        icon: <Folder />,
        title: "Môn học",
        to: path.ADMIN.MODULE,
      },
      {
        icon: <Handshake />,
        title: "Phân công",
        to: path.ADMIN.ASSIGNMENT,
      },
      {
        icon: <File />,
        title: "Đề kiểm tra",
        to: "#",
      },
      {
        icon: <MessageCircle />,
        title: "Thông báo",
        to: path.ADMIN.NOTIFICATION,
      },
    ],
  },
  {
    group: "QUẢN TRỊ",
    items: [
      {
        icon: <UserCog />,
        title: "Nhóm quyền",
        to: path.ADMIN.PERMISSTION,
      },
    ],
  },
]

export const sidebar_teacher = [
  {
    group: "",
    items: [
      {
        icon: <Rocket />,
        title: "Tổng quan",
        to: path.TEACHER.OVERVIEW,
      },
    ],
  },
  {
    group: "SINH VIÊN",
    items: [
      {
        icon: <Users />,
        title: "Học phần",
        to: path.TEACHER.STUDY_GROUP,
      },
      {
        icon: <FileText />,
        title: "Đề thi",
        to: path.TEACHER.EXAM,
      },
    ],
  },
  {
    group: "QUẢN LÝ",
    items: [
      {
        icon: <AlignStartVertical />,
        title: "Nhóm học phần",
        to: path.TEACHER.MODULE,
      },
      {
        icon: <CircleHelp />,
        title: "Câu hỏi",
        to: path.TEACHER.QUESTION,
      },
      {
        icon: <Users />,
        title: "Người dùng",
        to: path.TEACHER.USER,
      },
      {
        icon: <Folder />,
        title: "Môn học",
        to: path.TEACHER.SUBJECT,
      },
      {
        icon: <Handshake />,
        title: "Phân công",
        to: path.TEACHER.ASSIGNMENT,
      },
      {
        icon: <File />,
        title: "Đề kiểm tra",
        to: path.TEACHER.EXAM,
      },
      {
        icon: <MessageCircle />,
        title: "Thông báo",
        to: path.TEACHER.NOTIFICATION,
      },
    ],
  },
]

export const sidebar_student = [
  {
    group: "",
    items: [
      {
        icon: <Rocket />,
        title: "Tổng quan",
        to: path.STUDENT.OVERVIEW,
      },
    ],
  },
  {
    group: "QUẢN LÝ",
    items: [
      {
        icon: <AlignStartVertical />,
        title: "Nhóm học phần",
        to: path.STUDENT.STUDY_GROUP,
      },
      {
        icon: <File />,
        title: "Đề kiểm tra",
        to: path.STUDENT.EXAM,
      },
      {
        icon: <MessageCircle />,
        title: "Thông báo",
        to: path.STUDENT.NOTIFICATION,
      },
    ],
  },
]
