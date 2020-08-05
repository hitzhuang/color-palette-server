const mongoose = require("mongoose");
const User = require("./user.model");
const seeder = require("./data/palette.seeder");
const PaletteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emoji: {
        type: String,
        required: true,
    },
    colors: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

PaletteSchema.pre("remove", async function (next) {
    try {
        let user = await User.findById(this.user);
        user.palettes.remove(this.id);
        await user.save();
        return next();
    } catch (err) {
        return err;
    }
});

const Palette = mongoose.model("Palette", PaletteSchema);
module.exports = Palette;

module.exports.seeder = async (user) => {
    for (let i = 0; i < seeder.length; i++) {
        const s = seeder[i];
        let palette = await Palette.create({
            name: s.paletteName,
            emoji: s.emoji,
            colors: s.colors,
            user: user._id,
        });
        user.palettes.push(palette.id);
    }
    user.save();
};

module.exports.findAll = async (ids) => {
    return await Palette.find().where("_id").in(ids).exec();
};
