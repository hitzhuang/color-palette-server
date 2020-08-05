const { check } = require("express-validator");

exports.create = [
    check("name", "Name is required.").notEmpty(),
    check("emoji", "Emoji is required").notEmpty(),
    check("colors", "Colors"),
];
