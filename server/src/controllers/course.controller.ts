import { course } from "@prisma/client";
import prisma from "../config/db";
import { Request, Response } from "express";
import { controller } from "@prisma/client";

export const findCourses = async (req: Request, res: Response) => {
  let courses = await prisma.course.findMany();
  res.json({ courses });
};

export const findMyCourses = async (req: Request, res: Response) => {
  let { id } = res.locals.user;
  let courses = await prisma.course.findMany({
    where: { teacherID: id },
    
  });
  res.json({ courses });
};

export const findOneCourse = async (req: Request, res: Response) => {
  let findCourse = await prisma.course.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.send({ findCourse });
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, hours, major } = req.body as course;
    let createCourse = await prisma.course.create({
      data: {
        title,
        hours,
        major,
        teacherID: res.locals.user.id,
      },
    });
    res.send({ "successfully data": createCourse });
  } catch (error) {
    console.log(error);
  }
};
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id, title, hours, major } = req.body as course;

    let upd = await prisma.course.update({
      where: {
        id: req.params.id,
      },
      data: {
        id,
        title,
        hours,
        major,
        teacherID: JSON.stringify(res.locals.user),
      },
    });

    res.send({ "Update successfully": upd });
  } catch (err) {
    console.log(err);
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    await prisma.course.delete({
      where: {
        id: req.params.id,
      },
    });
    res.send("Delete Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const removeCourse = async (req: Request, res: Response) => {
  try {
    let { id } = res.locals.user;
    const del = await prisma.course.delete({
      where: { id: id },
    });
    !del
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "Deleted user has been succesful", delete: del });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const updateCourseWithToken = async (req: Request, res: Response) => {
  try {
    const { id, title, hours, major } = req.body as course;
    req.body as course;
    let { idT } = res.locals.user;
    const upd = await prisma.course.update({
      where: { id: idT },
      data: {
        id,
        title,
        hours,
        major,
      },
    });
    !upd
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "update user has been succesful", upd: upd });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const deleteAllCourses = async (req: Request, res: Response) => {
  try {
    await prisma.course.deleteMany();
  } catch (error) {
    console.log(error);
  }

  res.send("All Courses has been deleted successfully");
};
