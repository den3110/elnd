"use client"
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher"
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation
} from "@/redux/features/notifications/notificationsApi"
import React, { useEffect, useState } from "react"
import { IoMdNotificationsOutline } from "react-icons/io"
import { io } from "socket.io-client"
import { format } from "timeago.js"
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = io(ENDPOINT, { transports: ["websocket"] })

const DashboardHeader = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true
  })
  const [
    updateNotificationStatus,
    { isSuccess }
  ] = useUpdateNotificationStatusMutation()
  const [notifications, setNotifications] = useState([])
  const [audio] = useState(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
      )
  )

  const playNotificationSound = () => {
    audio.play()
  }

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter(item => item.status === "unread")
      )
    }
    if (isSuccess) {
      refetch()
    }
    audio.load()
  }, [data, isSuccess, audio])

  useEffect(() => {
    socketId.on("newNotification", data => {
      refetch()
      playNotificationSound()
    })
  }, [])

  const handleNotificationStatusChange = async id => {
    await updateNotificationStatus(id)
  }

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[9999999]">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[1000000000] rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item, index) => (
              <div
                className="dark:bg-[#2d3a4e] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"
                key={index}
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">{item.title}</p>
                  <p
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white">
                  {item.message}
                </p>
                <p className="p-2 text-black dark:text-white text-[14px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default DashboardHeader
