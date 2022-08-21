
const express = require("express");
var path = require("path");
const mongoose = require("mongoose");

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
const Contact = require("./models/Contact.js");

const routes = require("./routes/router.js");
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

// app.listen(3000, () => console.log("Listening on port 3000"))
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})