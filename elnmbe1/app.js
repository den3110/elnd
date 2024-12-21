require("dotenv").config()
import express from "express"
export const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import { ErrorMiddleware } from "./middleware/error"
import userRouter from "./routes/user.route"
import courseRouter from "./routes/course.route"
import orderRouter from "./routes/order.route"
import notificationRouter from "./routes/notification.route"
import analyticsRouter from "./routes/analytics.route"
import layoutRouter from "./routes/layout.route"
import { rateLimit } from "express-rate-limit"
import uploadRouter from "./routes/upload.route"
import fileUpload from "express-fileupload"
// @ts-ignore
import swaggerJSDoc from "swagger-jsdoc"
// @ts-ignore
import swaggerUi from "swagger-ui-express"
import path from "path"

// Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "API documentation for my project Greenwich Academy"
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`
      }
    ]
  },
  apis: ["./routes/*.ts"]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

// body parser
app.use(express.json({ limit: "50mb" }))

// cookie parser
app.use(cookieParser())

// cors => cross origin resource sharing
app.use(
  cors({
    origin: true,
    credentials: true
  })
)

//satrt add
app.use(
  fileUpload({
    useTempFiles: true
  })
)
// end add

// api requests limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false
})

// routes
app.use(
  "/api/v1",
  userRouter,
  orderRouter,
  courseRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter,
  //start add
  // end add
  uploadRouter
)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// testing api
app.get("/test", (req, res, next) => {
  res.status(200).json({
    succcess: true,
    message: "API is working"
  })
})

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// unknown route
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`)
  err.statusCode = 404
  next(err)
})

// middleware calls
app.use(limiter)
app.use(ErrorMiddleware)
