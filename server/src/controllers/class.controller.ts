import { DateTime } from "luxon";
import prisma from "../config/db";
import { Request, Response } from "express";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { class_1 } from "@prisma/client";
import { format } from "date-fns";
// import Moment from "moment";
import moment from "moment";
import { IController } from "../middleware/auth";

export const findClasses = async (req: Request, res: Response) => {
  let classes = await prisma.class_1.findMany({
    include: {
      course: true,
      controller: true,
    },
  });

  res.json({ classes });
};

export const findClassesForController = async (req: Request, res: Response) => {
  let classes = await prisma.class_1.findMany({
    include: {
      course: true,
      controller: true,
    },
  });

  res.json({ classes });
};

export const findOneClass = async (req: Request, res: Response) => {
  let findClass = await prisma.class_1.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      course: true,
    },
  });
  res.send({ findClass });
};

let heu = moment().format("dddd LT");
console.log(heu);

export const createClass = async (req: Request, res: Response) => {
  try {
    const { class_id, numOfStudents, fromTime, toTime, courseId } =
      req.body as class_1;

    let createClass = await prisma.class_1.create({
      data: {
        class_id,
        numOfStudents,
        fromTime,
        toTime,
        teacherId: res.locals.user.id,
        courseId,
      },
    });
    res.send({ "successfully data": createClass });
  } catch (error) {
    console.log(error);
  }
};
// const formatDate = Date();  format(formatDate, "HH:MM")
export const updateClass = async (req: Request, res: Response) => {
  try {
    const { class_id, numOfStudents, courseId, fromTime, toTime } =
      req.body as class_1;
    let upd = await prisma.class_1.update({
      where: {
        id: req.params.id,
      },
      data: {
        class_id,
        numOfStudents,
        fromTime,
        toTime,
        teacherId: res.locals.user,
        courseId,
      },
    });

    res.send({ "Update successfully": upd });
  } catch (err) {
    console.log(err);
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    await prisma.class_1.delete({
      where: {
        id: req.params.id,
      },
    });
    res.send("Delete Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const removeClass = async (req: Request, res: Response) => {
  try {
    // let idAdmin = res.locals.user.id as IController;
    const { id } = req.params;
    const del = await prisma.class_1.delete({
      where: { id: id },
    });
    !del
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "Deleted class has been succesful", delete: del });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const updateClassWithToken = async (req: Request, res: Response) => {
  try {
    const { class_id, numOfStudents, fromTime, toTime, courseId } =
      req.body as class_1;
    let { id } = req.params;
    const upd = await prisma.class_1.update({
      where: { id: id },
      data: {
        class_id,
        numOfStudents,
        fromTime,
        toTime,
        teacherId: res.locals.user,
        courseId,
      },
    });
    !upd
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "update class has been succesful", upd: upd });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const removeAllClasses = async (req: Request, res: Response) => {
  try {
    const del = await prisma.class_1.deleteMany({});
    !del
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "Delete classes has been succesful", delete: del });
  } catch (err) {
    res.json({ msg: err });
  }
};
