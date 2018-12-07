const express = require("express");
const Appartment = require("../models/appartment");
const router = express.Router();

// Add a new appartment in the database

exports.createAppartment = function (req, res, next) {
  const appartment = new Appartment({
    appartmentCodeName: req.body.appartmentCodeName,
    appartmentName: req.body.appartmentName,
    rent: req.body.rent,
    monthlyExpenses: req.body.monthlyExpenses,
    eanNumber: req.body.eanNumber,
    electricityMeter: req.body.electricityMeter,
    hotWaterMeter: req.body.hotWaterMeter,
    coldWaterMeter: req.body.coldWaterMeter,
    appartmentWarranty: req.body.appartmentWarranty
  });
  console.log(appartment);
  appartment.save().then(createdAppartment => {
    res.status(201).json({
      message: "Appartment added successfully",
      appartment: {
        ...createdAppartment,
        id: createdAppartment._id
      }

    });
  });
};

// View all appartments
exports.getAppartments = function (req, res, next) {
  Appartment.find().then(documents => {
    if (documents) {
      res.status(200).json({
        message: "Appartment fetched successfully!",
        appartments: documents
      });
    } else {
      res.status(404).json({
        message: "appartment not found!"
      });
    }
  });
};

// select an appartment
exports.getAppartment = function (req, res, next) {
  Appartment.findById(req.params.id).then(appartment => {
    if (appartment) {
      res.status(200).json(appartment);
    } else {
      res.status(404).json({
        message: "Post not found!"
      });
    }
  });
};


// update an appartment created using a ID
exports.updateAppartment = function (req, res, next) {
  const appartment = new Appartment({
    _id: req.body.id,
    appartmentCodeName: req.body.appartmentCodeName,
    appartmentName: req.body.appartmentName,
    rent: req.body.rent,
    monthlyExpenses: req.body.monthlyExpenses,
    eanNumber: req.body.eanNumber,
    electricityMeter: req.body.electricityMeter,
    hotWaterMeter: req.body.hotWaterMeter,
    coldWaterMeter: req.body.coldWaterMeter,
    appartmentWarranty: req.body.appartmentWarranty,
  });
  Appartment.updateOne({
    _id: req.params.id
  }, appartment).then(result => {
    res.status(200).json({
      message: "Update appartment successful!"
    });
  });
};

// delete an appartment

exports.deleteAppartment = function (req, res, next) {
  Appartment.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Post deleted!" });
  });
};

