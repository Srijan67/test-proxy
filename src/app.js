const express = require("express");
const app = express();
const PORT = 4001;
const mongoose = require("mongoose");
const usersModel = require("./userModel");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require('path');
const fs = require('fs')
const morgan = require('morgan')
app.use(express.json());
const expressJwt = require("express-jwt");
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/testMUI").then(() => {
  console.log("connected DB");
});
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: logStream }));
app.use(express.urlencoded({ extended: true }));
const pacfilePath = path.join(__dirname, "pacfile.pac");
app.use("/proxy-config", express.static("C:/projects/testmui-api/pacUtils"));

app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
});
//routes
app.get("/", (req, res) => {
  const originalUrl = req.url; // Get the original URL from the query parameters
  console.log(originalUrl, ' original url ')
  res.redirect('http://192.168.22.19:3000'); 
});
app.get("/test", (req, res) => {
  console.log('test2')
  res.redirect(req.get('referer')); 
});
app.get("/login", async (req, res) => {
  console.log('test2')
 res.status(200).json({message: 'ok'})
});

app.post("/login", async (req, res) => {
  console.log('login!');
  let { email, password } = req.body;
  const data = await usersModel.findOne({ email: email });

  if (data) {
    if (data.password === password) {
      var token = jwt.sign({ ...data }, "shhhhh");

      res.status(200).set({
        'authentication-token': token
      }).json({ data, token: token, success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
});
app.post("/create", async (req, res) => {
  const data = await usersModel.create(req.body);
  if (data) {
    res.status(200).json({ message: "data added!" });
  } else {
    res.status(400).json({ message: "User Failed to Add!" });
  }
});
app.listen(PORT, () => {
  console.log("Connected to PORT: ", PORT);
});
