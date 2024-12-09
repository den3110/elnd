"use client"
import CourseContent from "@/app/components/Course/CourseContent"
import Loader from "@/app/components/Loader/Loader"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
import { redirect } from "next/navigation"
import React, { useEffect } from "react"

const Page = ({ params }) => {
  const id = params.id
  const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {})

  // useEffect(() => {
  //   if (data) {
  //     const isPurchased = data.user.courses.find(
  //       (item: any) => item._id === id
  //     );
  //     if (!isPurchased) {
  //       redirect("/");
  //     }
  //   }
  //   if (error) {
  //     redirect("/");
  //   }
  // }, [data,error]);
  useEffect(() => {
    if (error) {
      redirect("/")
    }
  }, [error])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data?.user} />
        </div>
        // <>
        //   {data && data.user && (
        //       (data.user.role === "admin" || data.user.role === "teacher") ||
        //       data.user.courses.find((item: any) => item._id === id)
        //   ) ? (
        //       <div>
        //         <CourseContent id={id} user={data.user} />
        //       </div>
        //   ) : (
        //       redirect("/")
        //   )}
        // </>
      )}
    </>
  )
}

export default Page
