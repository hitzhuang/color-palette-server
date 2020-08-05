const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;

module.exports.generateJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 24 * 60 * 60,
    });
};
