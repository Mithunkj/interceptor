const mongoose = require("mongoose");

const connectdb = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/intersepter");
    console.log("connectdb");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;
