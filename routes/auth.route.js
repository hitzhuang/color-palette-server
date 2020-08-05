var express = require("express");
var router = express.Router();
var { register, login } = require("../controllers/auth.controller");
var validator = require("../validators/auth.validator");
var errors = require("../middleware/validate");

router.post("/register", validator.register, errors, register);
router.post("/login", validator.login, errors, login);

module.exports = router;
