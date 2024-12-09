import React from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box } from "@mui/material"
import { useTheme } from "next-themes"
import Loader from "../../Loader/Loader"
import { format } from "timeago.js"
import { useGetAllUsersQuery } from "@/redux/features/user/userApi"

const AllCourses = () => {
  const { theme } = useTheme()
  const { isLoading, data } = useGetAllUsersQuery({})

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 }
  ]

  const rows = []

  if (!isLoading && data) {
    data.users
      .filter(user => user.role === "user")
      .forEach(user => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: format(user.createdAt)
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
