import prisma from "../config/db";
import { Request, Response } from "express";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { log } from "console";
import { student } from "@prisma/client";

export const findStudents = async (req: Request, res: Response) => {
  let student = await prisma.student.findMany();
  res.json({ student });
};

export const findOneStudent = async (req: Request, res: Response) => {
  let student = await prisma.student.findUnique({
    where: {
      email: req.params.email,
    },
  });
  res.send({ student});
};

export const addStudent = async (req: Request, res: Response) => {
  const { fName, lName, email, password, major } = req.body as student;
  const hash = await argon2.hash(password);
  let student = await prisma.student.create({
    data: {
      fName,
      lName,
      email,
      password: hash,
      major,
    },
  });
  res.send({ "successfully data": student });
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { fName, lName, email, password, major, role } = req.body;
    let upd = await prisma.student.update({
      where: {
        id: req.params.id,
      },
      data: {
        fName,
        lName,
        email,
        password,
        major,
      },
    });

    res.send({ "Update successfully": upd });
  } catch (err) {
    console.log(err);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    await prisma.student.delete({
      where: {
        id: req.params.id,
      },
    });
    res.send("Delete Successfully");
  } catch (error) {
    log(error);
  }
};

export const Login4Student = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let student = await prisma.student.findUnique({
      where: {
        email,
      },
    });

    if (
      !student ||
      !(await argon2.verify(student.password, req.body.password))
    ) {
      return res.status(403).json({ Error: "Wrong email or password" });
    }

    const enToken = jwt.sign(
      { id: student.id },
      process.env.API_SECRET as string,
      { expiresIn: "3h" }
    );
    return res.status(200).json({
      msg: `welcome ${student.fName}`,
      token: enToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    let { fName, lName, email, password, major } = req.body;

    const hash = await argon2.hash(password);

    let student = await prisma.student.create({
      data: {
        fName,
        lName,
        email,
        password: hash,
        major,
      },
    });

    res.send({ "Super User Created successfully": student });
  } catch (error) {
    console.log(`There is an error ${error}`);
  }
};

export const removeStudent = async (req: Request, res: Response) => {
  try {
    let { id } = res.locals.user;
    const del = await prisma.student.delete({
      where: { id: id },
    });
    !del
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "Deleted user has been succesful", delete: del });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const updateStudentToken = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    let { id } = res.locals.user;
    const hash = await argon2.hash(password);
    const upd = await prisma.student.update({
      where: { id: id },
      data: {
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.fName,
        password: hash,
        major: req.body.major,
      },
    });
    !upd
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "update user has been succesful", upd: upd });
  } catch (err) {
    res.json({ msg: err });
  }
};
