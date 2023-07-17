const express = require("express");
const router = new express.Router();
const clientCon = require("../controllers/clientCon");
const validate = require("../util/account-validation");

router.get("/login", clientCon.buildLogin);

router.get("/logincheck", clientCon.jwtAuth, clientCon.buildback);

router.post("/login", validate.checkloginData, clientCon.loginclient);

router.post(
  "/reg",
  validate.loginRules(),
  validate.checkloginData,
  clientCon.register
);
module.exports = router;
