const express = require("express");
const router = express.Router();
const palettes = require("../controllers/palettes.controller");
const validator = require("../validators/palette.validator");
const requestErrors = require("../middleware/validateRequestError");

router.route("/").post(validator.create, requestErrors, palettes.create);
router.route("/:message_id").delete(palettes.remove);

module.exports = router;
