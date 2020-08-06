const { register } = require("./auth.controller");

const { Palette } = require("../models");

exports.create = async (req, res, next) => {
    try {
        // check if a duplicated palette
        let user = req.user.id;
        let { name, emoji, colors } = req.body;
        let duplicatedPalette = await Palette.findOne({ name });
        if (duplicatedPalette) {
            return next({
                status: 406,
                errors: { email: "Sorry, the palette name has been taken." },
            });
        }

        // create a new palette and return
        let palette = await Palette.create({ name, emoji, colors, user });
        res.status(200).json({
            palette: { id: palette.id, name, emoji, colors },
        });
    } catch (error) {
        return next({ status: 400, message: error.message });
    }
};

exports.remove = async (req, res, next) => {
    try {
        let palette = await Palette.findById(req.params.message_id);
        if (palette) {
            palette.remove();
            res.status(200).json({ palette });
        } else {
            return next({
                status: 404,
                errors: { email: "The palette does not exist." },
            });
        }
    } catch (error) {
        return next({ status: 400, message: error.message });
    }
};

exports.reload = async (req, res, next) => {
    try {
        let palettes = await Palette.findAll(req.user.palettes);
        res.status(200).json({ palettes });
    } catch (error) {
        return next({ status: 400, message: error.message });
    }
};
