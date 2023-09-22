import { log } from "console";
import express, { Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectDB } from "./config/db";
import routerController from "./routers/controllers.routes";
import routerClass from "./routers/class.routes";
import routerCourse from "./routers/course.routes";
import routerStudent from "./routers/student.routes";
import routerShowClass from "./routers/showClasses.routes";

const app: Application = express();

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

// Controller
app.use("/controller", routerController);

// Classes
app.use("/classes", routerClass);

// Courses
app.use("/course", routerCourse);

// Students
app.use("/students", routerStudent);

// show classes
app.use("/show_classes", routerShowClass);

app.listen(PORT, () => log(`Server running on ${PORT}...`));
