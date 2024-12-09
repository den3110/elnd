// server/routes/course.route.ts
import express from "express";
import {
  addAnwser,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAdminAllCourses,
  getTeacherAllCourses,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post("/create-course", isAutheticated, authorizeRoles("admin", "teacher"), uploadCourse);


courseRouter.put("/edit-course/:id", isAutheticated, authorizeRoles("admin", "teacher"), editCourse);


courseRouter.get("/get-course/:id", getSingleCourse);


courseRouter.get("/get-courses", getAllCourses);


courseRouter.get("/get-admin-courses", isAutheticated, authorizeRoles("admin", "teacher"), getAdminAllCourses);

courseRouter.get("/get-teacher-courses", isAutheticated, authorizeRoles("teacher"), getTeacherAllCourses);

courseRouter.get("/get-course-content/:id", isAutheticated, getCourseByUser);

courseRouter.put("/add-question", isAutheticated, addQuestion);

courseRouter.put("/add-answer", isAutheticated, addAnwser);

courseRouter.put("/add-review/:id", isAutheticated, addReview);

courseRouter.put("/add-reply", isAutheticated, addReplyToReview);

courseRouter.post("/getVdoCipherOTP", generateVideoUrl);

courseRouter.delete("/delete-course/:id", isAutheticated, authorizeRoles("admin"), deleteCourse);

export default courseRouter;
