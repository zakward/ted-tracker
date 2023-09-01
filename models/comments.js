const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  tedId: {
    type: Schema.Types.ObjectId,
    ref: "Ted",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    validate: {
      validator: function (val) {
        return Number.isInteger(val);
      },
      message: "Rating must be a whole number",
    },
  },
});

module.exports = mongoose.model("Comment", commentSchema);
