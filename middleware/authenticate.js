const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) next(err);
        if (!user) {
            return res
                .status(401)
                .json({ error: { message: "Unauthorized!" } });
        }
        req.user = user;
        next();
    })(req, res, next);
};
