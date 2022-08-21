require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

// Connect to DB
mongoose.connect(process.env.DATABASE, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// import schemas
require("./models/Contact");


const app = require("./app");

const server = app.listen(3000, function () {
  console.log(`Express is running on port ${server.address().port}`);
});