import express from "express";
import verifyToken from "../middleware/auth";
import Comment from "../models/comment";
import { Request, Response, NextFunction } from "express";
import Answer from "../models/answer";
import Post from "../models/post";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const answer = await Answer.findOne({ id: req.params.id });
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
      const post = await Post.findOne({ id: req.body.post });
      if (post) {
        const payloads = {
          ...req.body,
        };
        const answer = await Answer.create(payloads);
        post.answers = [...post.answers, answer];
        post.save();
        res.status(201).json(answer);
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
      const answer = await Answer.findOneAndUpdate(
        { id: req.params.post },
        { ...req.body }
      );
      res.status(201).json(answer);
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
      await Answer.findOneAndDelete({ id: req.params.post });
      res.status(201).json("deleted");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
