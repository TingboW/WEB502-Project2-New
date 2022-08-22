
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
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession);
routes.use(passport.initialize());
routes.use(passport.session());
app.set("views", __dirname + "/views"); // general config
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "html");

app.use("/", routes);

module.exports = app;

// app.listen(3000, () => console.log("Listening on port 3000"))
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/MyDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String,
});


UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model("userInfo", UserDetail, "userInfo");

/* PASSPORT LOCAL AUTHENTICATION */
passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

/* ROUTES */
const connectEnsureLogin = require("connect-ensure-login");

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login?info=" + info);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

app.get("/login", (req, res) =>
  res.sendFile("/login.html", { root: __dirname })
//  res.sendFile(path.join(__dirname, "../public/views/", "login.html"));
  ///res.sendFile(path.join(__dirname, './views/login.html'))
);


app.get("/index-admin", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.sendFile("./views/index-admin.html", { root: __dirname })
);

app.get("/private", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.sendFile("./views/private.html", { root: __dirname })
);

app.get("/user", connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.send({ user: req.user })
);

app.get("/logout", (req, res) => {
  req.logout(), res.sendFile("./views/logout.html", { root: __dirname });
});

/* REGISTER SOME USERS */
//UserDetails.register({username:'lucy',active:false},'lucy');
//UserDetails.register({username:'joy',active:false},'joy');
//UserDetails.register({username:'ray',active:false},'ray');