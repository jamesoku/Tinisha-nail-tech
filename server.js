const express = require("express");
const app = express();
const port = 3000;
const connectToMongoDB = require("./DB/DB");
const cookieParser = require("cookie-parser");

// Serve static files from the "public" directory
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use("/client", require("./routes/client-route"));

connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
