//server/utils/db.ts
import mongoose from "mongoose"
require("dotenv").config()

const dbUrl = process.env.DB_URL || ""

const connectDB = async () => {
  try {
    console.log(dbUrl)
    await mongoose.connect(dbUrl).then(data => {
      console.log(`Database connected with ${data.connection.host}`)
    })
  } catch (error) {
    console.log(error.message)
    setTimeout(connectDB, 5000)
  }
}

export default connectDB
