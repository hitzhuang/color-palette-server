var express = require("express");
var router = express.Router();
var controller = require("../controllers/palettes.controller");

router.get("/", controller.index);
router.post("/", controller.create);

module.exports = router;
