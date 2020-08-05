const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let myerrors = errors.errors.map((err) => ({ [err.param]: err.msg }));
        return res.status(400).json({
            error: { errors: myerrors },
        });
    }
    next();
};
