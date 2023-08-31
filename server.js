const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
require("dotenv").config();

app.use(express.json());
app.use(morgan("dev"));
mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://zakward85:mF7Sor4LVukaBppb@cluster0.ifzwf3a.mongodb.net/",
  (err) => {
    if (err) {
      throw err;
    }
    console.log("Connected to MongoDB");
  }
);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(8800, () => {
  console.log("listening on port 8800");
});
