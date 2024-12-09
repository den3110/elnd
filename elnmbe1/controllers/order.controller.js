import { CatchAsyncError } from "../middleware/catchAsyncErrors"
import ErrorHandler from "../utils/ErrorHandler"
import userModel from "../models/user.model"
import CourseModel from "../models/course.model"
import path from "path"
import ejs from "ejs"
import sendMail from "../utils/sendMail"
import NotificationModel from "../models/notification.Model"
import { getAllOrdersService, newOrder } from "../services/order.service"
import { redis } from "../utils/redis"
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// create order
export const createOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId } = req.body

    const user = await userModel.findById(req.user?._id)

    const courseExistInUser = user?.courses.some(
      course => course._id.toString() === courseId
    )

    if (courseExistInUser) {
      return res.status(200).json({
        ok: true
      })
    }

    const course = await CourseModel.findById(courseId)

    if (!course) {
      return next(new ErrorHandler("Course not found", 404))
    }

    const data = {
      courseId: course._id,
      userId: user?._id
    }

    user?.courses.push(course?._id)

    await redis.set(req.user?._id, JSON.stringify(user))

    await user?.save()

    await NotificationModel.create({
      user: user?._id,
      title: "New Order",
      message: `You have a new order from ${course?.name}`
    })

    course.purchased = course.purchased + 1

    await course.save()

    newOrder(data, res, next)
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
})

export const createOrderApp = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId } = req.body
    const user = await userModel.findById(req.user?._id)

    const courseExistInUser = user?.courses.some(
      course => course._id.toString() === courseId
    )

    if (courseExistInUser) {
      return next(
        new ErrorHandler("You have already purchased this course", 400)
      )
    }

    const course = await CourseModel.findById(courseId)

    if (!course) {
      return next(new ErrorHandler("Course not found", 404))
    }

    const data = {
      courseId: course._id,
      userId: user?._id
    }

    const mailData = {
      order: {
        _id: course._id.toString().slice(0, 6),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      }
    }

    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/order-confirmation.ejs"),
      { order: mailData }
    )

    try {
      if (user) {
        await sendMail({
          email: user.email,
          subject: "Order Confirmation",
          template: "order-confirmation.ejs",
          data: mailData
        })
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500))
    }

    user?.courses.push(course?._id)

    await redis.set(req.user?._id, JSON.stringify(user))

    await user?.save()

    await NotificationModel.create({
      user: user?._id,
      title: "New Order",
      message: `You have a new order from ${course?.name}`
    })

    course.purchased = course.purchased + 1

    await course.save()

    newOrder(data, res, next)
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
})

// get All orders --- only for admin
export const getAllOrders = CatchAsyncError(async (req, res, next) => {
  try {
    getAllOrdersService(res)
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
})

//  send stripe publishble key
export const sendStripePublishableKey = CatchAsyncError(async (req, res) => {
  res.status(200).json({
    publishablekey: process.env.STRIPE_PUBLISHABLE_KEY
  })
})

// new payment
export const newPayment = CatchAsyncError(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "E-Learning"
      },
      automatic_payment_methods: {
        enabled: true
      }
    })

    res.status(201).json({
      success: true,
      client_secret: myPayment.client_secret
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
})

export const newPaymentApp = async (req, res) => {
  try {
    const { amount, name } = req.body

    // Tạo Session trên Stripe để tạo link thanh toán
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: name
            },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: "https://greenwichacademy.vercel.app/payment-success",
      cancel_url: "https://greenwichacademy.vercel.app/payment-cancel"
    })

    res.json({ session: session })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    res.status(500).json({ error: "Could not create checkout session" })
  }
}
