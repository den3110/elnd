"use client"
import React, { useState } from "react"
import Heading from "../utils/Heading"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Policy from "./Privacy-Policy"

const Page = props => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState()
  const [route, setRoute] = useState("Login")

  return (
    <div>
      <Heading
        title="Policy - Elearning"
        description="Elearning is a learning management system for helping programmers."
        keywords="programming,mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={6}
        setRoute={setRoute}
        route={route}
      />
      <Policy />
      <Footer />
    </div>
  )
}

export default Page
