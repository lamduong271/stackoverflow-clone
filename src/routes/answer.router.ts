import express from "express";
import verifyToken from "../middleware/auth";
import Comment from "../models/comment";
import { Request, Response, NextFunction } from "express";
import Answer from "../models/answer";
import Post from "../models/post";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const answer = await Answer.findOne({ _id: req.params.id }).populate(
      "post"
    );
    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await Post.findOne({ _id: req.body.post });
      if (post) {
        const payloads = {
          author: req.user.id,
          post: post._id,
          ...req.body,
        };
        const answer = await Answer.create(payloads);
        post.answers = [...post.answers, answer];
        post.save();
        res.status(201).json(answer);
      }
      res.status(401).json("post not found");
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const answer = await Answer.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body }
      );
      res.status(201).json(answer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  ":postId/:id",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const answer = await Answer.findOne({ _id: req.params.post });
      const post = await Post.findOne({ id: req.params.postId });
      if (post && answer) {
        const updatedParam = post.answers.filter(
          (ans) => ans._id !== answer._id
        );
        post.answers = [...updatedParam];
        await answer.delete();
        await post.save();
        res.status(201).json("deleted");
      }
      res.status(401).json("post not found");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
