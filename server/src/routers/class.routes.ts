import express from "express";
import {
  findClasses,
  findOneClass,
  createClass,
  updateClass,
  updateClassWithToken,
  removeClass,
  deleteClass,
  removeAllClasses,
  findClassesForController,
} from "../controllers/class.controller";
import { auth, authAdminsAndTeachers } from "../middleware/auth";
import validate from "../middleware/validate";
import { Classtype } from "../zodSchema/zod.class";

let router = express.Router();

// Get Classes
router.get("/", findClasses);
// router.get("/:id", findOneClass);

// Create Class
router.post(
  "/add",
  auth,
  authAdminsAndTeachers,
  validate(Classtype),
  createClass
);

router.get("/", findClasses);
// router.get("/:id", findOneClass);

// find Class
router.get("/my_classes", auth, authAdminsAndTeachers, findClassesForController);

// Create Class
router.post(
  "/add",
  auth,
  authAdminsAndTeachers,
  validate(Classtype),
  createClass
);

// Update Class
router.put("/update_class/:id", auth, authAdminsAndTeachers, updateClass);
router.put("/update/:id", auth, authAdminsAndTeachers, updateClassWithToken);

// Remove Class
router.delete("/delete/:id", auth, authAdminsAndTeachers, deleteClass);
router.delete("/remove/:id", auth, authAdminsAndTeachers, removeClass);
router.delete("/removeAll/", auth, authAdminsAndTeachers, removeAllClasses);

export default router;
