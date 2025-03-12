import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import path from "./utils/path"
import MainLayout from "./components/layouts/MainLayout"
import Login from "./components/login/Login"
import Home from "./features/home/components/Home"
import User from "./features/users/components/User"
import Subject from "./features/subject/components/Subject"
import { Toaster } from "sonner"
import Module from "./features/module/Module"

function App() {
  return (
    <div className="container mx-auto">
      <div className="min-h-screen">
        <Router>
          <Routes>
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.PUBLIC} element={<MainLayout />}>
              <Route path={path.HOME} element={<Home />} />
              <Route path={path.MODULE} element={<Module />} />
              <Route path={path.SUBJECT} element={<Subject />} />
              <Route path={path.USER} element={<User />} />
              <Route path={path.TEST} element={<Home />} />
              <Route path={path.QUESTION} element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </div>
      <Toaster position="top-center" expand={false} richColors />
    </div>
  )
}
export default App
