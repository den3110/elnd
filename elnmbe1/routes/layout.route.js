import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createLayout, deleteLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
const layoutRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Layouts
 *   description: API endpoints for managing layouts
 */

/**
 * @swagger
 * /api/v1/layouts/create-layout:
 *   post:
 *     summary: Create a new layout
 *     tags: [Layouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - type
 *               - content
 *     responses:
 *       200:
 *         description: Layout created successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       500:
 *         description: Some server error
 */
layoutRouter.post("/create-layout", isAutheticated, authorizeRoles("admin"), createLayout);

/**
 * @swagger
 * /api/v1/layouts/edit-layout:
 *   put:
 *     summary: Edit an existing layout
 *     tags: [Layouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - type
 *               - content
 *     responses:
 *       200:
 *         description: Layout edited successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       500:
 *         description: Some server error
 */
layoutRouter.put("/edit-layout", isAutheticated, authorizeRoles("admin"), editLayout);

/**
 * @swagger
 * /api/v1/layouts/get-layout/{type}:
 *   get:
 *     summary: Get a layout by type
 *     tags: [Layouts]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of layout to retrieve
 *     responses:
 *       200:
 *         description: Layout retrieved successfully
 *       404:
 *         description: Layout not found
 *       500:
 *         description: Some server error
 */
layoutRouter.get("/get-layout/:type", getLayoutByType);


layoutRouter.delete("/delete-layout/:type/:title", isAutheticated, authorizeRoles("admin"), deleteLayout);


export default layoutRouter;
