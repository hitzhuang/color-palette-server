var mongoose = require("mongoose");
// mongoose.set("debug", true);
mongoose.set("useCreateIndex", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
});

module.exports.User = require("./user.model");
module.exports.Token = require("./token.model");
