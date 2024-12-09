// server.routes/user.route.ts
import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth, updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const userRouter = express.Router();



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/v1/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
userRouter.post("/registration", registrationUser);

/**
 * @swagger
 * /api/v1/activate-user:
 *   post:
 *     summary: Activate a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - activationCode
 *             properties:
 *               activationCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: User activated successfully
 *       404:
 *         description: User not found or activation code invalid
 *       500:
 *         description: Some server error
 */
userRouter.post("/activate-user", activateUser);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login as a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Some server error
 */
userRouter.post("/login", loginUser);

/**
 * @swagger
 * /api/v1/logout:
 *   get:
 *     summary: Logout the current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Some server error
 */
userRouter.get("/logout", isAutheticated, logoutUser);

/**
 * @swagger
 * /api/v1/refresh-token:
 *   get:
 *     summary: Refresh access token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Unauthorized, invalid or expired refresh token
 *       500:
 *         description: Some server error
 */
userRouter.get("/refresh-token", updateAccessToken);

/**
 * @swagger
 * /api/v1/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Some server error
 */
userRouter.get("/me", isAutheticated, getUserInfo);

/**
 * @swagger
 * /api/v1/social-auth:
 *   post:
 *     summary: Authenticate using social media
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accessToken
 *               - provider
 *             properties:
 *               accessToken:
 *                 type: string
 *               provider:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Bad request, missing parameters
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Some server error
 */
userRouter.post("/social-auth", socialAuth);

/**
 * @swagger
 * /api/v1/update-user-info:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Some server error
 */
userRouter.put("/update-user-info", isAutheticated, updateUserInfo);
/**
 * @swagger
 * /api/v1/update-user-password:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: User password updated successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Some server error
 */
userRouter.put("/update-user-password", isAutheticated, updatePassword);

/**
 * @swagger
 * /api/v1/update-user-avatar:
 *   put:
 *     summary: Update user avatar
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User avatar updated successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Some server error
 */
userRouter.put("/update-user-avatar", isAutheticated, updateProfilePicture);

/**
 * @swagger
 * /api/v1/get-users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       500:
 *         description: Some server error
 */
userRouter.get("/get-users", isAutheticated, authorizeRoles("admin", "teacher"), getAllUsers);

/**
 * @swagger
 * /api/v1/update-user:
 *   put:
 *     summary: Update user role
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: New role for the user
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
userRouter.put("/update-user", isAutheticated, authorizeRoles("admin"), updateUserRole);

/**
 * @swagger
 * /api/v1/delete-user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
userRouter.delete("/delete-user/:id", isAutheticated, authorizeRoles("admin"), deleteUser);

export default userRouter;
