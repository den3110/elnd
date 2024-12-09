"use client"
import React from "react"
import Heading from "../utils/Heading"
import DashboardHero from "../components/Admin/DashboardHero"
import TeacherSidebar from "@/app/components/Teacher/sidebar/TeacherSidebar"
import TeacherProtected from "../hooks/teacherProtected"
import AllUsers from "@/app/components/Admin/Users/AllUsers"

const page = props => {
  return (
    <div>
      <TeacherProtected>
        <Heading
          title="Elearning - Teacher"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <TeacherSidebar />

            <div className="w-[85%]">
              <DashboardHero />
              {/*  <DashboardHero isDashboard={true} />*/}
              <AllUsers />
            </div>
          </div>
        </div>
      </TeacherProtected>
    </div>
  )
}

export default page
