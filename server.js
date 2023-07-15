const express = require("express");
const app = express();
const port = 3000;
const connectToMongoDB = require("./DB/DB");
const cookieParser = require("cookie-parser");
const backCon = require("./controllers/backCon");

const path = require("path");
// Set 'views' directory as the location for EJS files
app.set("views", path.join(__dirname, "views"));
// Serve static files from the "public" directory
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  const imagelist = await backCon.imageCon.getImageList();
  const boxes = await backCon.boxCon.getboxes();
  res.render("index.ejs", { imagelist, boxes });
});

app.use("/client", require("./routes/client-route"));
app.use("/back", require("./routes/backroute"));

connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
