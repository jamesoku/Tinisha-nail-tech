const clientCon = {};
const User = require("../models/userschema");
const bcrypt = require("bcrypt");
var ejs = require("ejs");
const jwt = require("jsonwebtoken");
const backCon = require("../controllers/backCon");

require("dotenv").config();
clientCon.buildLogin = async function (req, res, next) {
  res.render("../views/login");
};

clientCon.buildback = async function (req, res, next) {
  const imagelist = await backCon.imageCon.BuildImageList();

  res.render("../views/back", { imagelist });
};

clientCon.loginclient = async function (req, res) {
  const { client_email, client_password } = req.body;

  try {
    // Find the user by email
    console.log(client_email);
    const user = await User.findOne({ email: client_email });
    console.log(user);

    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the password entered by the user with the hashed password
    const isPasswordMatch = await bcrypt.compare(
      client_password,
      user.password
    );

    console.log(isPasswordMatch);
    // Check if the passwords match
    if (isPasswordMatch) {
      delete user.client_password;
      // Passwords match, return success message or perform desired action
      const accessToken = generateAccessToken(user._id, res);
      console.log("yo1", accessToken);

      // Return the access token to the client
      res.redirect("/client/logincheck");
      // return res.json({ accessToken });
    } else {
      // Passwords do not match, return an error
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    // Handle any errors that occur during the login process
    return res.status(500).json({ error: "An error occurred during login" });
  }
};

clientCon.jwtAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const clientData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    loggedin = true;
    next();
  } catch (error) {
    res.clearCookie("jwt", { httpOnly: true });
    loggedin = false;
    return res.status(403).redirect("/client/login");
  }
};

const generateAccessToken = (userId, res) => {
  const payload = { userId };

  // Set the expiration time for the token (e.g., 1 hour)
  const expiresIn = "1h";

  // Sign the token with the secret key
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn,
  });

  res.cookie("jwt", token, { httpOnly: true });
  return token;
};

clientCon.register = async function (req, res) {
  try {
    const { client_email, client_password } = req.body;

    // Validate the email and password inputs here (e.g., check for required fields, password complexity, etc.)

    // Hash the password
    const hashedPassword = await bcrypt.hash(client_password, 10);
    console.log(hashedPassword);
    // Create a new user instance with the hashed password
    const newuser = await User.create({
      email: client_email,
      password: hashedPassword,
    });

    // Save the user to the database

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during user registration" });
  }
};

module.exports = clientCon;
