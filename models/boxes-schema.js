const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const BoxListSchema = new mongoose.Schema({
  listname: { type: String, required: true },
  list: {
    type: [nameSchema],
    required: true,
  },
});

const Box = mongoose.model("Box", BoxListSchema, "Boxlist");
module.exports = Box;
