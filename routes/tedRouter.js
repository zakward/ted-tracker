const express = require("express");
const Ted = require("../models/tedModel");
const commentRouter = require("./commentsRouter");
const comment = require("../models/comments");
const tedRouter = express.Router();
const user = require("../models/user");

tedRouter.post("/", (req, res, next) => {
  req.body.userId = req.auth._id;
  const newTed = new Ted(req.body);
  newTed.save(async (err, savedTed) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    const comments = await comment
      .find({ tedId: savedTed._id })
      .populate("userId", "-password");
    const postUser = await user.findById(savedTed.userId);
    const postWithComment = {
      ...savedTed.toObject(),
      comments,
      postUser: postUser.withoutPassword(),
    };
    return res.status(201).send(postWithComment);
  });
});

tedRouter.get("/", (req, res, next) => {
  Ted.find((err, ted) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(ted);
  });
});

tedRouter.get("/allWithComments", (req, res, next) => {
  Ted.find(async (err, ted) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    const tedWithCommments = await Promise.all(
      ted.map(async (bud) => {
        const comments = await comment
          .find({ tedId: bud._id })
          .populate("userId", "-password");
        const tedUser = await user.findById(bud.userId);
        return {
          ...bud.toObject(),
          tedUser: tedUser.withoutPassword(),
          comments: comments,
        };
      })
    );
    res.status(200).send(tedWithCommments);
  });
});

module.exports = tedRouter;
