const { check } = require("express-validator");

exports.register = [
    check("email", "Email is required.").normalizeEmail().isEmail(),
    check("username", "Username is required.").notEmpty(),
    check("password", "Password is required.").exists(),
    check("passwordConfirmation")
        .exists()
        .custom((value, { req }) => value === req.body.password),
];

exports.login = [
    check("email", "Email is required.").normalizeEmail().isEmail(),
    check("password", "Password is required.").exists(),
];
