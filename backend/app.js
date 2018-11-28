const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");


const residentRoutes = require("./routes/residents");
const appartmentRoutes = require("./routes/appartments");
const contractInfoRoutes = require("./routes/contract-info");
const fileRoutes = require('./routes/file');
const userRoutes = require("./routes/user");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/residents', )
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use("/docs", express.static(path.join("backend/docs")));

// doc upload
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT,DELETE, OPTIONS"
  );

  next();
});

app.use("/api/residents", residentRoutes);
app.use("/api/appartments", appartmentRoutes);
app.use("/api/contractInfo", contractInfoRoutes);
app.use('/api/file',fileRoutes);
app.use("/api/user", userRoutes);


module.exports = app;


