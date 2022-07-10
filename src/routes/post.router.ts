import express from "express";
import verifyToken from "../middleware/auth";
import Post from "../models/post";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("author");
    res.status(201).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate(
      "author",
      "comments"
    );
    res.status(201).json(post);
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
      const post = await (await Post.create(payloads)).populate("author");
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", verifyToken, async (req, res, next) => {
  const payloads = {
    ...req.body,
  };
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      payloads
    );
    res.status(201).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    await Post.findOneAndDelete({ _id: req.params.id });
    res.status(201).json("deleted");
  } catch (error) {
    next(error);
  }
});

export default router;
