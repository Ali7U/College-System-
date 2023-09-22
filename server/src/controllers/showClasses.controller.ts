import prisma from "../config/db";
import { Request, Response } from "express";
import { showclass } from "@prisma/client";

export const addClassIntoStudent = async (req: Request, res: Response) => {
  try {
    const { studentId, classId } = req.body as showclass;
    const addClass = await prisma.showclass.create({
      data: {
        studentId,
        classId,
      },
    });
    res.json({
      msg: "The class has been added to the student successfully",
      addClass,
    });
  } catch (error) {
    console.log(`There is an error ${error}`);
  }
};

export const showClassWithStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as showclass;
    const show = await prisma.showclass.findUnique({
      where: {
        id,
      },
      include: {
        class_1: true,
      },
    });
    res.json({ "My Class:": show });
  } catch (error) {
    console.log(`There is an error ${error}`);
  }
};

export const showAllClassesForStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params as showclass;
    const show = await prisma.showclass.findMany({
      where: {
        studentId,
      },
      include: {
        class_1: {
          select: {
            course: true,
            class_id: true,
            fromTime: true,
            toTime: true,
            controller: true
          },
        },
      },
    });
    res.json({ show });
  } catch (error) {
    console.log(`there is an error in classes for students ${error}`);
  }
};

export const endPointClasses = async (req: Request, res: Response) => {
  const { studentId } = req.params as showclass;
};
