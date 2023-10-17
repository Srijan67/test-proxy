const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = new Schema({
  userName: String,
  email: String,
  password: String,
});

const usersModel = mongoose.model("User", userModel);
module.exports = usersModel;
