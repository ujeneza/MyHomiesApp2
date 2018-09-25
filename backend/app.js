const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const residentRoutes = require("./routes/residents");
const appartmentRoutes = require("./routes/appartments");
const contractInfoRoutes = require("./routes/contract-info");

const app = express();

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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT,DELETE, OPTIONS"
  );

  next();
});

app.use("/api/residents", residentRoutes);
app.use("/api/appartments", appartmentRoutes);
app.use("/api/residents/contractInfos", contractInfoRoutes);


module.exports = app;


/* app.post("/api/residents", (req, res, next) => {
  const resident = new Resident({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    appartmentInfo: req.body.appartmentInfo,
    isRentPaid: req.body.isRentPaid,
    phoneNumber: req.body.phoneNumber,
    rent: req.body.rent,
    contractEndDate: req.body.contractEndDate,
    nextVisitDate: req.body.nextVisitDate
  });
  resident.save().then(createdResident => {
    res.status(201).json({
      message: "Resident added successfully",
      ResidentId: createdResident._id
    });
  });
});

app.get("/api/residents", (req, res, next) => {
  Resident.find().then(documents => {
    res.status(200).json({
      message: "residents fetched successfully!",
      residents: documents
    });
  });
});

app.delete("/api/residents/:id", (req, res, next) => {
  Resident.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Resident deleted!" });
  });
}); */
