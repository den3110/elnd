import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  createOrderApp,
  getAllOrders,
  newPayment,
  newPaymentApp,
  sendStripePublishableKey,
} from "../controllers/order.controller";
const orderRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */

/**
 * @swagger
 * /api/v1/orders/create-order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties as per your requirement
 *     responses:
 *       200:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Some server error
 */
orderRouter.post("/create-order", isAutheticated, createOrder);
/**
 * @swagger
 * /api/v1/orders/get-orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       500:
 *         description: Some server error
 */
orderRouter.get("/get-orders", isAutheticated, authorizeRoles("admin", "teacher"), getAllOrders);

/**
 * @swagger
 * /api/v1/orders/payment/stripepublishablekey:
 *   get:
 *     summary: Get Stripe publishable key for payment
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stripe publishable key retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Some server error
 */
orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

/**
 * @swagger
 * /api/v1/orders/payment:
 *   post:
 *     summary: Make a new payment
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Payment successful
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Some server error
 */
orderRouter.post("/payment", isAutheticated, newPayment);
orderRouter.post("/payment-app", isAutheticated, newPaymentApp);
export default orderRouter;
