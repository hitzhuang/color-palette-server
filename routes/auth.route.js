const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const validator = require("../validators/auth.validator");
const fieldErrors = require("../middleware/validateFieldErrors");

router.post("/register", validator.register, fieldErrors, register);
router.post("/login", validator.login, fieldErrors, login);

module.exports = router;
