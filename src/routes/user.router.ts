import express from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const saltRounds = 10;
    if (user) {
      res.send("Email already in use.");
    } else {
      const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
      await User.create({
        ...req.body,
        password: hashedPwd,
      });
      res.send("ok");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });

    if (existUser) {
      const comparedPwd = await bcrypt.compare(
        req.body.password,
        existUser.password as string
      );
      if (comparedPwd) {
        var token = sign(
          {
            id: existUser._id,
            email: existUser.email,
          },
          process.env.JWT_SECRET as string
        );
        existUser.token = token;
        res.send({ success: true, token, user: existUser });
      } else {
        res.status(401).send({ message: "not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const existUser = await User.findOne({ email: req.params.id });

    if (existUser) {
      res.status(200).send({ name: existUser.name, email: existUser.email });
    }
    res.status(401).send({ status: false, message: "not found user" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

export default router;
