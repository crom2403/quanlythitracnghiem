const routes = {
  login: "/auth/login",
  admin: {
    overview: "/admin/overview",
    study_group: "/admin/study_group",
    question: "/admin/question",
    user: "/admin/user",
    module: "/admin/module",
    assignment: "/admin/assignment",
    exam: "/admin/exam",
    notification: "/admin/notification",
    permission: "/admin/permission",
  },
  teacher: {
    overview: "/teacher/overview",
    study_group: "/study-group/teacher",
    study_group_detail: "/study-group/detail",
    question: "/teacher/question",
    user: "/teacher/user",
    module: "/teacher/module",
    assignment: "/teacher/assignment",
    exam: "/teacher/exam",
    notification: "/teacher/notification",
  },
  student: {
    overview: "/student/overview",
    study_group: "/student/study_group",
    exam: "/student/exam",
    notification: "/student/notification",
  },
}
export default routes
