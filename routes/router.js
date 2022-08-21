const express = require("express");
const session = require('express-session')
const mongoose = require("mongoose");
const path = require("path");
const auth = require("http-auth");
const bodyParser = require('body-parser')
const passport = require('passport');
const { check, validationResult } = require("express-validator");
const Users = require("../models/Users");
//const Contact = require("../models/Contact");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const router = express.Router();
const Contact = mongoose.model("Contact");
router.use(bodyParser.json())

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// Check token expiry
router.use(async (req, res, next) => {
  if(req.session.token){
    const token = req.session.token
    try {
      await jwt.verify(token, JWT_SECRET)
    } catch (err) {
      alert("Session expired. Please log in")
      res.json({ status: 'error', error: 'Session expired' })
      // res.redirect('/')
    }
  }
  next()
});

// Log out
router.post('/logout', async (req, res) => {
  try {
		res.json({ status: 'ok' })
	} catch (error) {
		res.json({ status: 'error', error: 'Failed to log out' });
	}
});

// View profile
router.post('/profile', async (req, res) => {
  const { token } = req.body
  try {
    jwt.verify(token, JWT_SECRET)		
		res.json({ status: 'ok' })
	} catch (error) {
		res.json({ status: 'error', error: 'Session expired' });
	}
})

// Change password -> Not used but available
router.post('/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)
		const _id = user.id
		const password = await bcrypt.hash(plainTextPassword, 10)

		await Users.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		res.json({ status: 'error', error: ';))' })
	}
})

// Login
router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await Users.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful
		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
			},
			JWT_SECRET,
      {expiresIn: '120s'}
		);
    req.session.token = token;
		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

// Register user
router.post('/register', async (req, res) => {
	const { username, password: plainTextPassword, firstname, lastname, email } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too short. Should be at least 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await Users.create({
			username,
			password,
      firstname,
      lastname,
      email
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}
	res.json({ status: 'ok' })
});

// Routes
router.get("/", (req, res) => {
  // res.send("it works!");
  res.sendFile(path.join(__dirname, "../public/views/", "index.html"));
});

router.get("/contact", (req, res) => {
  res.send("it works!");
});

// add validation here
router.post(
  "/",
  [
    check("firstname")
      .isLength({ min: 1 })
      .withMessage("Please enter your first name"),
    check("lastname")
      .isLength({ min: 1 })
      .withMessage("Please enter your last name"),
    check("street")
      .isLength({ min: 1 })
      .withMessage("Please enter your street"),
    check("city").isLength({ min: 1 }).withMessage("Please enter your city"),
    check("state").isLength({ min: 1 }).withMessage("Please enter your state"),
    check("country")
      .isLength({ min: 1 })
      .withMessage("Please enter your country"),
    check("zip").isLength(5).withMessage("Please enter a valid zip code"),
    check("zip").isNumeric().withMessage("Please enter a valid zip code"),
    check("phone").isNumeric().withMessage("Please enter a valid phone number"),
    check("phone")
      .isLength(10)
      .withMessage("Please enter a valid phone number"),
    check("email").isLength({ min: 1 }).withMessage("Please enter your email"),
    check("email").isEmail().withMessage("Please enter a valid email"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const contact = new Contact(req.body);

      contact
        .save()
        .then(() => {
          res.status(204).send();
        })
        .catch((err) => {
          res.send("Sorry! Something went wrong.");
        });
    } 
  }
);

module.exports = router;