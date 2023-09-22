import express from "express";
import {
  addClassIntoStudent,
  showAllClassesForStudent,
  showClassWithStudent,
} from "../controllers/showClasses.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/added", addClassIntoStudent);

router.get("/my_class/:id", auth, showClassWithStudent);
router.get("/my_class/All/:id", auth, showAllClassesForStudent);

export default router;
