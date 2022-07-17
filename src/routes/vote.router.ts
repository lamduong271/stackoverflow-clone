import express from "express";
import verifyToken from "../middleware/auth";
import Vote from "../models/vote";
import Answer from "../models/answer";
import Post from "../models/post";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

router.post(
  "/answer/voteup/:answerId/",
  verifyToken,
  async (req, res, next) => {
    const { id } = req.user;
    try {
      const answer = await Answer.findOne({ _id: req.params.answerId });
      if (answer) {
        const existingVote = answer.votes.filter(
          (vote) => vote.user.toString() === id.toString()
        );
        console.log("answer.votes ", answer.votes);
        if (existingVote.length === 0) {
          console.log("existingVote ", existingVote);
          const newVotePayloads = {
            user: id,
            answer: answer.id,
            type: "UP",
          };
          const newVote = await Vote.create(newVotePayloads);
          answer.votes = [...answer.votes, newVote];
          (await answer.save()).populate("votes");
          res.status(201).json(answer);
        } else {
          res.status(400).json("already voted");
        }
      }
      res.status(401).json("not found");
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/answer/votedown/:answerId/",
  verifyToken,
  async (req, res, next) => {
    const { id } = req.user;
    try {
      const answer = await Answer.findOne({ _id: req.params.answerId });
      if (answer) {
        const existingVote = answer.votes.filter(
          (vote) => vote.user.toString() === id.toString()
        );
        if (existingVote.length === 0) {
          const newVotePayloads = {
            user: id,
            answer: answer.id,
            type: "DOWN",
          };
          const newVote = await Vote.create(newVotePayloads);
          answer.votes = [...answer.votes, newVote];
          (await answer.save()).populate("votes");
          res.status(201).json(answer);
        } else {
          res.status(400).json("already voted");
        }
      } else {
        res.status(401).json("not found");
      }
    } catch (error) {
      next(error);
    }
  }
);

// router.post(
//   "/question/voteup/:questionId/",
//   verifyToken,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.user;
//     try {
//       const post = await Post.findOne({ _id: req.params.questionId });
//       if (post) {
//         const existingVote = post.votes.filter((user) => user === id);
//         if (!existingVote) {
//           const newVotePayloads = {
//             user: id,
//             post: post.id,
//             type: "UP",
//           };
//           const newVote = await Vote.create(newVotePayloads);
//           post.votes = [...post.votes, newVote];
//           (await post.save()).populate("votes");
//           res.status(201).json(post);
//         } else {
//         }
//       }
//       res.status(401).json("not found");
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.post(
  "/question/votedown/:questionId/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;
      const post = await Post.findOne({ _id: req.params.questionId });
      if (post) {
        const existingVote = post.votes.filter((user) => user === id);
        if (!existingVote) {
          const newVotePayloads = {
            user: id,
            post: post.id,
            type: "DOWN",
          };
          const newVote = await Vote.create(newVotePayloads);
          post.votes = [...post.votes, newVote];
          (await post.save()).populate("votes");
          res.status(201).json(post);
        }
      }
      res.status(401).json("not found");
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
      await Vote.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("deleted");
    } catch (error) {
      next(error);
    }
  }
);
export default router;
