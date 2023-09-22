import express from "express";
import {
  findStudents,
  findOneStudent,
  addStudent,
  updateStudent,
  Login4Student,
  Register,
  removeStudent,
} from "../controllers/student.controller";
import validate from "../middleware/validate";
import { Logintype, Registertype } from "../zodSchema/zod.user";
import { auth } from "../middleware/auth";

let router = express.Router();

router.get("/", findStudents);
router.get("/:email", findOneStudent);

router.post("/post", addStudent);

router.post("/login", validate(Logintype), Login4Student);

router.post("/register", validate(Registertype), Register);

router.put("/:id", auth, updateStudent);

router.delete("/delete", auth, removeStudent);
// router.put("/update/:id", auth, updateStudent2);

export default router;
