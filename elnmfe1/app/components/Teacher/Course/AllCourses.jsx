import React, { useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box } from "@mui/material"
import { useTheme } from "next-themes"
import { FiEdit2 } from "react-icons/fi"
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi"
import Loader from "../../Loader/Loader"
import { format } from "timeago.js"
import Link from "next/link"

const AllCourses = props => {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [courseId, setCourseId] = useState("")
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: params => {
        return (
          <>
            <Link href={`/teacher/edit-course/${params.row.id}`}>
              <FiEdit2 className="dark:text-white text-black" size={20} />
            </Link>
          </>
        )
      }
    }
  ]

  const rows = []

  {
    data &&
      data.courses.forEach(item => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          created_at: format(item.createdAt)
        })
      })
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none"
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000"
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000"
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important"
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000"
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important"
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000"
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000"
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0"
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC"
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`
              }
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  )
}

export default AllCourses
