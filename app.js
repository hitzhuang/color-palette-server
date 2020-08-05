require("dotenv").config();
var express = require("express");
var app = express();
const cors = require("cors");
// var path = require("path");
// var cookieParser = require("cookie-parser");
var logger = require("morgan");

// express app settings
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/", require("./routes/index.route"));

/* passport jwt middleware */
const passport = require("passport");
app.use(passport.initialize());
require("./service/passport")(passport);

/* definition of routes */
const authenticate = require("./middleware/authenticate");
app.use("/api", require("./routes/auth.route"));
app.use("/api/palettes", authenticate, require("./routes/palettes.route"));

/* error handling for undefined of routes */
app.use((req, res, next) => {
    let error = new Error("Not Found!");
    error.status = 404;
    next(error);
});

/* final error handling of routes */
app.use((err, req, res, next) => {
    var error = { message: err.message || "Oops! Something went wrong." };
    if (err.errors) {
        error.errors = err.errors;
    }
    return res.status(err.status || 500).json({ error });
});

module.exports = app;
