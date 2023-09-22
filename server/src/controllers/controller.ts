import prisma from "../config/db";
import { Request, Response } from "express";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { log } from "console";
import { controller } from "@prisma/client";

export const findControllers = async (req: Request, res: Response) => {
  let controllers = await prisma.controller.findMany();
  res.json({ controllers });
};

export const findOneController = async (req: Request, res: Response) => {
  let controller = await prisma.controller.findUnique({
    where: {
      email: req.params.email,
    },
  });
  res.send({ controller });
};

export const createController = async (req: Request, res: Response) => {
  try {
    const { fName, lName, email, password, major } = req.body as controller;
    const hash = await argon2.hash(password);
    let controller = await prisma.controller.create({
      data: {
        fName,
        lName,
        email,
        password: hash,
        major,
      },
    });
    res.send({ "successfully data": controller });
  } catch (error) {
    console.log(`there is an error: ${error}`);
  }
};

export const updateController = async (req: Request, res: Response) => {
  try {
    const { fName, lName, email, password, major, role } = req.body;
    let upd = await prisma.controller.update({
      where: {
        id: req.params.id,
      },
      data: {
        fName,
        lName,
        email,
        password,
        major,
        role,
      },
    });

    res.send({ "Update successfully": upd });
  } catch (err) {
    console.log(err);
  }
};

export const deleteController = async (req: Request, res: Response) => {
  try {
    await prisma.controller.delete({
      where: {
        id: req.params.id,
      },
    });
    res.send("Delete Successfully");
  } catch (error) {
    log(error);
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let superUser = await prisma.controller.findUnique({
      where: {
        email,
      },
    });

    if (
      !superUser ||
      !(await argon2.verify(superUser.password, req.body.password))
    ) {
      return res.status(403).json({ Error: "Wrong email or password" });
    }

    const enToken = jwt.sign(
      { id: superUser.id, role: superUser.role },
      process.env.API_SECRET as string,
      { expiresIn: "3h" }
    );
    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({
        msg: `welcome ${superUser.fName}`,
        token: enToken,
        role: superUser.role,
      });
  } catch (error) {
    console.log(error);
  }
}; 

export const Register = async (req: Request, res: Response) => {
  try {
    let { fName, lName, email, password, major } = req.body;

    const hash = await argon2.hash(password);

    let superUser = await prisma.controller.create({
      data: {
        fName,
        lName,
        email,
        password: hash,
        major,
      },
    });

    res.send({ "Super User Created successfully": superUser });
  } catch (error) {
    console.log(`There is an error ${error}`);
  }
};

export const removeControll = async (req: Request, res: Response) => {
  try {
    let { id } = res.locals.user;
    const del = await prisma.controller.delete({
      where: { id: id },
    });
    !del
      ? res.json({ msg: "somthing is wrong" })
      : res.json({ msg: "Deleted user has been succesful", delete: del });
  } catch (err) {
    res.json({ msg: err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    let { id } = res.locals.user;
    const hash = await argon2.hash(password);
    const upd = await prisma.controller.update({
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
