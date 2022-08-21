const express = require("express");
const routes = require("./routes/router.js");
var path = require("path");
const bodyParser = require("body-parser");
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60000
    }
});
const passport = require('passport');
const Users = require("./models/Users.js");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession);
routes.use(passport.initialize());
routes.use(passport.session());
app.set("views", __dirname + "/views"); // general config
app.set("view engine", "html");

app.use("/", routes);

module.exports = app;