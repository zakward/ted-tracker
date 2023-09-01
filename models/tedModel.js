const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tedModel = new Schema({
  category: {
    type: String,
    required: true,
    default: "flower",
  },
  name: {
    type: String,
    required: true,
  },
  strength: {
    type: String,
  },
  datePurchased: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: String,
  },
  flavor: {
    type: String,
  },
  effects: {
    type: String,
  },
  ailments: {
    type: String,
  },
  lineage: {
    type: String,
  },
  price: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imgUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Ted", tedModel);
