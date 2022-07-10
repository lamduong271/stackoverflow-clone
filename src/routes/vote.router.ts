import express from "express";
import verifyToken from "../middleware/auth";
import Vote, { Direction } from "../models/vote";
import { Request, Response } from "express";
import Answer from "../models/answer";
import Post from "../models/post";
const router = express.Router();

router.post("/answer/voteup/:answerId/", verifyToken, async (req, res) => {
  const { id } = req.user;
  const answer = await Answer.findOne({ id: req.params.answerId });
  if (answer) {
    const existingVote = answer.votes.filter((user) => user === id);
    if (!existingVote) {
      const newVotePayloads = {
        user: id,
        answer: answer.id,
        post: null,
        type: Direction.Up,
      };
      const newVote = await Vote.create(newVotePayloads);
      answer.votes = [...answer.votes, newVote];
      answer.save();
    }
  }
});

router.post("/question/voteup/:questionId/", verifyToken, async (req, res) => {
  const { id } = req.user;
  const post = await Post.findOne({ id: req.params.questionId });
  if (post) {
    const existingVote = post.votes.filter((user) => user === id);
    if (!existingVote) {
      const newVotePayloads = {
        user: id,
        post: post.id,
        type: Direction.Up,
      };
      const newVote = await Vote.create(newVotePayloads);
      post.votes = [...post.votes, newVote];
      post.save();
    }
  }
});

router.post("/answer/votedown/:answerId/", verifyToken, async (req, res) => {
  const { id } = req.user;
  const answer = await Answer.findOne({ id: req.params.answerId });
  if (answer) {
    const existingVote = answer.votes.filter((user) => user === id);
    if (!existingVote) {
      const newVotePayloads = {
        user: id,
        answer: answer.id,
        post: null,
        type: Direction.Down,
      };
      const newVote = await Vote.create(newVotePayloads);
      answer.votes = [...answer.votes, newVote];
      answer.save();
    }
  }
});

router.post(
  "/question/votedown/:questionId/",
  verifyToken,
  async (req, res) => {
    const { id } = req.user;
    const post = await Post.findOne({ id: req.params.questionId });
    if (post) {
      const existingVote = post.votes.filter((user) => user === id);
      if (!existingVote) {
        const newVotePayloads = {
          user: id,
          post: post.id,
          type: Direction.Down,
        };
        const newVote = await Vote.create(newVotePayloads);
        post.votes = [...post.votes, newVote];
        post.save();
      }
    }
  }
);
