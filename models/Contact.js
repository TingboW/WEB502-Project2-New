const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zip: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  randomcode: {
    type: String,
  },
});

contactSchema.plugin(passportLocalMongoose);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

