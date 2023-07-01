const validate = {};
const { body, validationResult } = require("express-validator");

validate.loginRules = () => {
  return [
    // valid email is required and cannot already exist in the DB
    body("client_email")
      .trim()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),
    // .custom(async (client_email) => {
    //   const emailExists = await accountModel.checkExistingEmail(client_email);
    //   if (emailExists) {
    //     throw new Error("Email exists. Please login or use different email");
    //   }
    // }),

    // password is required and must be strong password
    body("client_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ];
};

validate.checkloginData = async (req, res, next) => {
  const { client_email } = req.body;
  console.log(req.body);
  if (!req.body || !req.body.client_email) {
    // Handle the case when 'req.body' or 'client_email' is undefined
    // Return an appropriate response or perform necessary error handling
    return res
      .status(400)
      .json({ error: "Missing client_email in request body" });
  }

  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("../views/login", {
      errors,
      message: null,
      title: "Login",
      client_email,
    });
    return;
  }
  next();
};
module.exports = validate;
