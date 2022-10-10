const express = require("express");
const { example } = require("./printer");
const router = express.Router();

router.post("/print", example);
// router.post("/forgot-password", forgotPassword);
// router.post("/change-password", changePassword);

module.exports = router;
