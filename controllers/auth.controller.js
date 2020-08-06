const { User, Token, Palette } = require("../models");

exports.register = async (req, res, next) => {
    try {
        // create user and add default palettes
        const { email, username, password } = req.body;
        let user = await User.create({ email, username, password });
        await Palette.seeder(user);

        // response with jwt token, id, username, and default palettes
        let token = Token.generateJWT({ id: user._id, username });
        let palettes = await Palette.findAll(user.palettes);
        res.status(200).json({ token, id: user._id, username, palettes });
    } catch (error) {
        if (error.code === 11000) {
            return next({
                status: 406,
                errors: { email: "Sorry, the email has been taken." },
            });
        }
        return next({
            status: 400,
            message: error.message,
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        // check if user not exists
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return next({
                status: 404,
                errors: { email: "The email does not exist." },
            });
        }
        // check if valid password
        let isMatch = await user.validatePassword(password, next);
        if (isMatch) {
            // response with jwt token, id, username, and user palettes
            const { username } = user;
            let palettes = await Palette.findAll(user.palettes);
            let token = Token.generateJWT({ id: user._id, username });
            res.status(200).json({ token, id: user._id, username, palettes });
        } else {
            return next({
                status: 406,
                errors: { password: "Invalid password." },
            });
        }
    } catch (error) {
        return next({ status: 400, message: error.message });
    }
};
