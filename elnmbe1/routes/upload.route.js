import express from 'express';
import { uploadVideoController } from '../controllers/upload.controller';
const uploadRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: API endpoints for file uploads
 */

/**
 * @swagger
 * /api/v1/uploads/upload:
 *   post:
 *     summary: Upload a video file
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video file uploaded successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Some server error
 */
uploadRouter.post('/upload', uploadVideoController);

export default uploadRouter;
