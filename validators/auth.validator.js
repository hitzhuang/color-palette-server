const { check } = require("express-validator");

exports.register = [
    check("email", "Email is required.").normalizeEmail().isEmail(),
    check("username", "Username is required.").notEmpty(),
    check("password", "Password is required.").notEmpty(),
    check("confirmPassword", "Password is not the same.")
        .notEmpty()
        .custom((value, { req }) => value === req.body.password),
];

exports.login = [
    check("email", "Email is required.").normalizeEmail().isEmail(),
    check("password", "Password is required.").notEmpty(),
];
