import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getCoursesAnalytics, getOrderAnalytics, getUsersAnalytics } from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: API endpoints for analytics data
 */

/**
 * @swagger
 * /api/v1/analytics/get-users-analytics:
 *   get:
 *     summary: Get users analytics data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users analytics data retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       500:
 *         description: Some server error
 */
analyticsRouter.get("/get-users-analytics", isAutheticated, authorizeRoles("admin", "teacher"), getUsersAnalytics);

/**
 * @swagger
 * /api/v1/analytics/get-orders-analytics:
 *   get:
 *     summary: Get orders analytics data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders analytics data retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       500:
 *         description: Some server error
 */
analyticsRouter.get("/get-orders-analytics", isAutheticated, authorizeRoles("admin", "teacher"), getOrderAnalytics);

/**
 * @swagger
 * /api/v1/analytics/get-courses-analytics:
 *   get:
 *     summary: Get courses analytics data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Courses analytics data retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       500:
 *         description: Some server error
 */
analyticsRouter.get("/get-courses-analytics", isAutheticated, authorizeRoles("admin", "teacher"), getCoursesAnalytics);

export default analyticsRouter;
