import { controller_role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { nextTick } from "process";

interface IController {
  id: string;
  role: controller_role;
}
const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization as string;
    const token = header?.split(" ")[1];
    !token && res.status(403).json({ msg: "you are not authorized" });

    const deToken = jwt.verify(
      token,
      process.env.API_SECRET as string
    ) as IController;
    res.locals.user = deToken;

    next();
  } catch (err) {
    res.status(403).json({ msg: `you are not authorized lol: ${err}` });
  }
};

const authAdminsAndTeachers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization as string;
    const token = header?.split(" ")[1];

    const deToken = jwt.verify(
      token,
      process.env.API_SECRET as string
    ) as IController;
    res.locals.user = deToken;

    const roles = deToken.role;
    if (roles.includes("Admin") || roles.includes("Teacher")) {
      next();
    } else res.status(403).json({ msg: "you are not allowed here!" });
    next;
  } catch (err) {
    console.log(err);
  }
};

export { auth, authAdminsAndTeachers, IController };
