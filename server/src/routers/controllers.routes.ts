import express from "express";
import {
  findControllers,
  findOneController,
  createController,
  updateController,
  Login,
  Register,
  removeControll,
} from "../controllers/controller";
import validate from "../middleware/validate";
import { Logintype, Registertype } from "../zodSchema/zod.user";
import { auth } from "../middleware/auth";

let router = express.Router();

router.get("/", findControllers);
router.get("/:email", findOneController);

router.post("/post", createController);

router.post("/login", validate(Logintype), Login);

router.post("/register", validate(Registertype), Register);

router.put("/:id", updateController);

router.delete("/delete", auth, removeControll);
router.put("/update/:id", auth, updateController);

export default router;
