const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const imageListSchema = new mongoose.Schema({
  images: {
    type: [imageSchema],
    required: true,
  },
});

const ImageList = mongoose.model("ImageList", imageListSchema, "imagelist");

module.exports = ImageList;
