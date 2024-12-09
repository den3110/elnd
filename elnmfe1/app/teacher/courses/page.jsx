"use client"
import DashboardHero from "@/app/components/Admin/DashboardHero"
import Heading from "@/app/utils/Heading"
import React from "react"
import AllCourses from "../../components/Teacher/Course/AllCourses"
import TeacherProtected from "@/app/hooks/teacherProtected"
import TeacherSidebar from "@/app/components/Teacher/sidebar/TeacherSidebar"

const page = props => {
  return (
    <div>
      <TeacherProtected>
        <Heading
          title="Elearning - Teacher"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <TeacherSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllCourses />
          </div>
        </div>
      </TeacherProtected>
    </div>
  )
}

export default page
