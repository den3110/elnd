"use client"

import { useEffect, useState } from "react"
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Typography } from "@mui/material"
import "react-pro-sidebar/dist/css/styles.css"
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  BarChartOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  ExitToAppIcon
} from "./Icon"
import avatarDefault from "../../../../public/assests/avatar.png"
import { useSelector } from "react-redux"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

const Item = ({ title, to, icon, selected, setSelected, logoutBase }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link
        onClick={e => {
          if (logoutBase === true) {
            e.preventDefault()
          }
        }}
        href={to}
      />
    </MenuItem>
  )
}

const Sidebar = () => {
  const router = useRouter()
  const { user } = useSelector(state => state.auth)
  const [logout, setlogout] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("Dashboard")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  const logoutHandler = () => {
    setlogout(true)
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important"
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important"
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important"
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`
        }
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 99999999999999,
          width: isCollapsed ? "0%" : "16%"
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0"
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/" className="block">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                    ELearning
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6"
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />

            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
              logoutBase={false}
            />

            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <div
              onClick={() => {
                router.push("/logout")
              }}
            >
              {/* eslint-disable-next-line */}
              <Item
                to="/logout"
                title="Logout"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={e => {
                  e.preventDefault()
                }}
                logoutBase={true}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

function deleteAllCookies() {
  // Lấy danh sách tất cả các cookie
  var cookies = document.cookie.split(";")

  // Lặp qua từng cookie và đặt lại thời gian sống của nó thành một ngày ở quá khứ
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    var eqPos = cookie.indexOf("=")
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
  }
}

export default Sidebar
