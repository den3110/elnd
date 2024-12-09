import { redirect } from "next/navigation"
import { useSelector } from "react-redux"

export default function TeacherProtected({ children }) {
  const { user } = useSelector(state => state.auth)

  if (user) {
    const isTeacher = user?.role === "teacher"
    return isTeacher ? children : redirect("/")
  }
}
