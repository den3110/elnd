import React, { useState } from "react"
import DashboardHeader from "./DashboardHeader"
import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets"

const DashboardHero = ({ isDashboard }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  )
}

export default DashboardHero
