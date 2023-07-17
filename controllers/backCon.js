const ImageList = require("../models/imageschema");
const BoxList = require("../models/boxes-schema");

imageCon = {};
boxCon = {};

//image
imageCon.getImageList = async function (req, res) {
  try {
    const images = await ImageList.findById("64b1da6680744fb1c0c9583c");

    return images.images;
  } catch (error) {
    res.status(500).json({ error: "An error occurred during find" });
  }
};

imageCon.deleteImage = async function (req, res) {
  const Id = req.params.id;
  console.log(Id);
  try {
    const result = await ImageList.updateOne(
      {
        _id: "64b1da6680744fb1c0c9583c",
      },
      { $pull: { images: { _id: Id } } }
    );
    console.log("Subdocument deleted successfully");
    const imagelist = await imageCon.getImageList();
    const boxes = await boxCon.getboxes();
    res.render("../views/back", { imagelist, boxes });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during deletion" });
  }
};

imageCon.registerImageList = async function (req, res) {
  console.log("hey");
  try {
    const emptyImageList = new ImageList({ images: [] });
    await emptyImageList.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during user registration" });
  }
};

imageCon.addImage = async function (req, res) {
  try {
    const imageFile = req.file;

    const updatedparam = await ImageList.findByIdAndUpdate(
      { _id: "64b1da6680744fb1c0c9583c" },
      {
        $push: {
          images: {
            title: imageFile.originalname,
            image: { data: imageFile.buffer, contentType: imageFile.mimetype },
          },
        },
      },
      { new: true }
    );

    if (!updatedparam) {
      return res.status(404).json({ message: "Parameter not found" });
    }

    const imagelist = await imageCon.getImageList();
    const boxes = await boxCon.getboxes();
    res.render("../views/back", { imagelist, boxes });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during user registration" });
  }
};

//box
boxCon.registerbox = async function (req, res) {
  try {
    const emptyboxlist = new BoxList({ listname: " ", list: [] });

    try {
      await emptyboxlist.save();
      res.status(201).json({ message: "Box registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred  box registration" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during box registration" });
  }
};

boxCon.updatelistname = async function (req, res) {
  const box = req.params.box;
  try {
    let Id;
    if (box === "box1") {
      Id = "64af7be04dabaa1f43fad0fc";
    } else if (box === "box2") {
      Id = "64af7c044dabaa1f43fad0fe";
    } else if (box === "box3") {
      Id = "64af7c074dabaa1f43fad100";
    }
    const ListName = req.body;
    console.log(ListName, Id);
    try {
      const updatedlistname = await BoxList.findByIdAndUpdate(
        { _id: Id },
        {
          $set: {
            listname: ListName.ListName,
          },
        },
        { new: true }
      );
      const imagelist = await imageCon.getImageList();
      const boxes = await boxCon.getboxes();
      res.render("../views/back", { imagelist, boxes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred  box registration" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during box registration" });
  }
};

boxCon.getboxes = async function (req, res) {
  try {
    const box1 = await BoxList.findById("64af7be04dabaa1f43fad0fc");
    const box2 = await BoxList.findById("64af7c044dabaa1f43fad0fe");
    const box3 = await BoxList.findById("64af7c074dabaa1f43fad100");

    boxes = { box1, box2, box3 };
    return boxes;
  } catch (error) {
    res.status(500).json({ error: "An error occurred during find" });
  }
};

boxCon.Addprice = async function (req, res) {
  const box = req.params.box;
  let Id;
  try {
    if (box === "box1") {
      Id = "64af7be04dabaa1f43fad0fc";
    } else if (box === "box2") {
      Id = "64af7c044dabaa1f43fad0fe";
    } else if (box === "box3") {
      Id = "64af7c074dabaa1f43fad100";
    }
    const { NewItem, price } = req.body;

    const newitemprice = await BoxList.findByIdAndUpdate(
      { _id: Id },
      {
        $push: {
          list: {
            name: NewItem,
            price: price,
          },
        },
      },
      { new: true }
    );

    if (!newitemprice) {
      return res.status(404).json({ message: "Parameter not found" });
    }
    const imagelist = await imageCon.getImageList();
    const boxes = await boxCon.getboxes();
    res.render("../views/back", { imagelist, boxes });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during box registration" });
  }
};

boxCon.deleteitemNPbox1 = async function (req, res) {
  const Id = req.params.id;
  console.log(Id);
  try {
    const result = await BoxList.updateOne(
      {
        _id: "64af7be04dabaa1f43fad0fc",
      },
      { $pull: { list: { _id: Id } } }
    );
    console.log("Subdocument deleted successfully");
    const imagelist = await imageCon.getImageList();
    const boxes = await boxCon.getboxes();
    res.render("../views/back", { imagelist, boxes });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during deletion" });
  }
};
boxCon.deleteitemNPbox2 = async function (req, res) {
  const Id = req.params.id;
  console.log(Id);
  try {
    const result = await BoxList.updateOne(
      {
        _id: "64af7c044dabaa1f43fad0fe",
      },
      { $pull: { list: { _id: Id } } }
    );
    console.log("Subdocument deleted successfully");
    const imagelist = await imageCon.getImageList();
    const boxes = await boxCon.getboxes();
    res.render("../views/back", { imagelist, boxes });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during deletion" });
  }
};
boxCon.deleteitemNPbox3 = async function (req, res) {
  const Id = req.params.id;
  console.log(Id);
  try {
    const result = await BoxList.updateOne(
      {
        _id: "64af7c074dabaa1f43fad100",
      },
      { $pull: { list: { _id: Id } } }
    );
    console.log(result, "Subdocument deleted successfully");
    const imagelist = await imageCon.getImageList();
    const boxes = await boxCon.getboxes();
    res.render("../views/back", { imagelist, boxes });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during deletion" });
  }
};
module.exports = { imageCon, boxCon };
