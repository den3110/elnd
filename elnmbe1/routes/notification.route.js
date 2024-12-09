import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getNotifications, updateNotification } from "../controllers/notification.controller";
const notificationRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API endpoints for managing notifications
 */

/**
 * @swagger
 * /api/v1/notifications/get-all-notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       500:
 *         description: Some server error
 */
notificationRoute.get("/get-all-notifications", isAutheticated, authorizeRoles("admin", "teacher"), getNotifications);

/**
 * @swagger
 * /api/v1/notifications/update-notification/{id}:
 *   put:
 *     summary: Update a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the notification to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [read, unread]
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Some server error
 */
notificationRoute.put("/update-notification/:id", isAutheticated, authorizeRoles("admin", "teacher"), updateNotification);

export default notificationRoute;
