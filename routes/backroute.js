const express = require("express");
const router = new express.Router();
const clientCon = require("../controllers/clientCon");
const backCon = require("../controllers/backCon");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Specify the directory where you want to store the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique file name for the uploaded file
  },
});
const upload = multer({ Storage: storage });
// router.get("/getimagelist", backCon.imageCon.BuildImageList);
router.post("/deleteimage/:id", backCon.imageCon.deleteImage);
router.post("/addimagelist", backCon.imageCon.registerImageList);
router.post("/addimage", upload.single("image"), backCon.imageCon.addImage);
router.post("/addboxlist", backCon.boxCon.registerbox);
router.post("/changelistname/:box", backCon.boxCon.updatelistname);
router.post("/addnewitemprice/:box", backCon.boxCon.Addprice);
module.exports = router;
