import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import path from "./utils/path"
import MainLayout from "./components/layouts/MainLayout"
import Login from "./components/login/Login"
import Home from "./components/home/Home"
import { Toaster } from "sonner"
import User_Teacher from "./features/teacher/user/User"
import Subject_Teacher from "./features/teacher/subject/Subject"
import Module_Teacher from "./features/teacher/module/Module"
import ModuleDetail_Teacher from "./features/teacher/module/ModuleDetail"
import Question_Teacher from "./features/teacher/question/Question"
import Overview_Teacher from "./features/teacher/overview/Overview"

function App() {
  return (
    <div className="container mx-auto">
      <div className="min-h-screen">
        <Router>
          <Routes>
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.PUBLIC} element={<MainLayout />}>
              {/* Các Routes của Teacher */}
              <Route path={path.TEACHER.OVERVIEW} element={<Overview_Teacher />} />
              <Route path={path.TEACHER.MODULE} element={<Module_Teacher />} />
              <Route
                path={`${path.TEACHER.MODULE_DETAIL}/:id`}
                element={<ModuleDetail_Teacher />}
              />
              <Route path={path.TEACHER.QUESTION} element={<Question_Teacher />} />
              <Route path={path.TEACHER.SUBJECT} element={<Subject_Teacher />} />
              <Route path={path.TEACHER.USER} element={<User_Teacher />} />
              {/* <Route path={path.TEST} element={<Home />} /> */}
            </Route>
          </Routes>
        </Router>
      </div>
      <Toaster position="top-center" expand={false} richColors />
    </div>
  )
}
export default App
