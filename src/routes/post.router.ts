import express from "express";
import verifyToken from "../middleware/auth";
import Post from "../models/post";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(201).json(posts);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const payloads = {
      author: req.user.id,
      title: req.body.title,
      textBody: req.body.textBody,
    };
    try {
      const post = await Post.create(payloads);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
