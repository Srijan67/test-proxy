const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const usersModel = require("./userModel");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require('path');
const fs = require('fs')
const morgan = require('morgan')
app.use(express.json());
const expressJwt = require("express-jwt");
const { default: axios } = require("axios");
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/testMUI").then(() => {
  console.log("connected DB");
});
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: logStream }));
app.use(express.urlencoded({ extended: true }));
const pacfilePath = path.join(__dirname, "..", "pacUtils");
console.log(pacfilePath, ' test path')
app.use("/proxy-config", express.static(pacfilePath));
const getLogin = async(obj, url) => {
  try {
    let data = await axios.post(url, obj)
    if(data && data.status === 200)
    return data
    
  } catch (error) {
    return error.response
  }
}
app.use(async (req, res, next) => {
  console.log(req, ' Query data')
  console.log(req.url, ' Query data', req.originalUrl)

  // let data = await getLogin(req.body,req.originalUrl)
  // if(data && data?.status){
  //   setTimeout(() => {
  //     console.log('contineu after 10 sec')
  //     res.status(data.status).set(data.headers).json(data.data)
  //   },3000)
  // }
 

});
//routes
app.get("/", (req, res) => {
  const originalUrl = req.url; 
  console.log(originalUrl, ' original url ')
  res.status(200).json({
    message: 'testing!'
  })
});
app.get('/getPacFile', (req,res) => {
  let pacContent = `function FindProxyForURL(url, host) {
    if (url === "http://192.168.22.19:4001/login") {
        return "PROXY 192.168.22.19:4000";
    } else {
        return "DIRECT";
    }
}`
  // res.setHeader('Content-Type', 'application/x-ns-proxy-autoconfig');
  // res.setHeader('Content-Disposition', `attachment; filename="proxy.pac"`);
  // Serve the generated PAC content as the response
  let pacFilePathName = pacfilePath+"/proxy.pac"
  fs.writeFileSync(pacFilePathName, pacContent);
  res.status(200).json({success: true})
})
app.post("/", (req, res) => {
  const originalUrl = req.url; 
  console.log(originalUrl, ' original url ')
  res.status(200).json({
    message: 'testing!'
  })
});
app.get("/test", (req, res) => {
  console.log('test2')
  res.redirect(req.get('referer')); 
});
app.post("/login", async (req, res) => {
  console.log('login!');
  let { email, password } = req.body;
  const data = await usersModel.findOne({ email: email });

  if (data) {
    if (data.password === password) {
      var token = jwt.sign({ ...data }, "shhhhh");

      res.status(200).json({ data, token: token, success: true });
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
