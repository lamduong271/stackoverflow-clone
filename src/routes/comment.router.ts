import express from "express";
import verifyToken from "../middleware/auth";
import Comment from "../models/comment";
import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
import Answer from "../models/answer";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await Post.findOne({ _id: req.body.post });
      const answer = await Answer.findOne({ _id: req.body.answer });
      if (post) {
        const payloads = {
          ...req.body,
          author: req.user.id,
          post: post._id,
        };
        const comment = await Comment.create(payloads);
        post.comments = [...post.comments, comment];
        await post.save();
        res.status(201).json(comment);
      } else if (answer) {
        const payloads = {
          ...req.body,
          author: req.user.id,
          answer: answer._id,
        };
        const comment = await Comment.create(payloads);
        answer.comments = [...answer.comments, comment];
        res.status(201).json(comment);
      } else {
        res.status(401).json("not found answer or post id");
      }
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
      const comment = await Comment.findOneAndUpdate(
        { _id: req.params.post },
        { ...req.body }
      );
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Comment.findOneAndDelete({ _id: req.params.post });
      res.status(201).json("deleted");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
