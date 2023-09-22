import {
  findCourses,
  findOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  removeCourse,
  updateCourseWithToken,
  deleteAllCourses,
  findMyCourses,
} from "../controllers/course.controller";

import express from "express";
import { auth, authAdminsAndTeachers } from "../middleware/auth";
import validate from "../middleware/validate";
import { Coursetype } from "../zodSchema/zod.course";
let router = express.Router();

router.get("/find_All/", findCourses);
router.get("/find/:id", findOneCourse);
router.get("/my_courses/", auth, authAdminsAndTeachers, findMyCourses);

router.post(
  "/add",
  auth,
  authAdminsAndTeachers,
  validate(Coursetype),
  createCourse
);

router.put(
  "/update/:id",
  auth,
  authAdminsAndTeachers,
  validate(Coursetype),
  updateCourse
);
router.put(
  "/update/:id",
  auth,
  authAdminsAndTeachers,
  validate(Coursetype),
  updateCourseWithToken
);

router.delete("/deleteAll", auth, deleteAllCourses);
router.delete("/delete/:id", deleteCourse);
router.delete("/remove/:id", auth, authAdminsAndTeachers, removeCourse);

export default router;
