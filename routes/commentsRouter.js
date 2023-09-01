const express = require("express");
const commentRouter = express.Router();
const comment = require("../models/comments.js");
const user = require("../models/user.js");

// Get Comment By Post

commentRouter.get("/:tedId", (req, res, next) => {
  comment.find({ tedID: req.params.postId }, (err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(comments);
  });
});

// Add New Comment

commentRouter.post("/:tedId", (req, res, next) => {
  req.body.tedId = req.params.tedId;
  req.body.userId = req.auth._id;
  const newComment = new comment(req.body);
  newComment.save(async (err, savedComment) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    const commentWithUser = await savedComment.populate("userId", "-password");

    return res.status(201).send(commentWithUser);
  });
});

commentRouter.delete("/:commentId", (req, res, next) => {
  comment.findOneAndDelete(
    { _id: req.params.commentId, userId: req.auth._id },
    (err, deletedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(`comment deleted: ${deletedComment.comment}`);
    }
  );
});

commentRouter.put("/:commentId", (req, res, next) => {
  comment.findOneAndUpdate(
    { _id: req.params.commentId, userId: req.auth._id },
    req.body,
    { new: true },
    async (err, updatedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      const commentWithUser = await updatedComment.populate(
        "userId",
        "-password"
      );

      return res.status(201).send(commentWithUser);
    }
  );
});

module.exports = commentRouter;
