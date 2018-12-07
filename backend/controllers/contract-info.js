const express = require("express");
const ContractInfo = require("../models/contract-info");
const multer = require("multer");
const router = express.Router();

// add contract information
exports.createContract = function (req, res, next) {
  const contractInfo = new ContractInfo({
    residentId: req.body.residentId,
    inventoryEntryDate: req.body.inventoryEntryDate,
    inventoryExitDate: req.body.inventoryExitDate,
    contractSignDate: req.body.contractSignDate,
    contractEndDate: req.body.contractEndDate,
    entryDate: req.body.entryDate,
    exitDate: req.body.exitDate,
    coldWaterIndex: req.body.coldWaterIndex,
    hotWaterIndex: req.body.hotWaterIndex,
    nextVisitDate: req.body.nextVisitDate,
    contractRecordedDate: Date.now()
  });
  console.log(contractInfo);
  contractInfo.save().then(createdContractInfo => {
    res.status(201).json({
      message: "ResidentContract added successfully",
      contractInfo: {
        ...createdContractInfo,
        id: createdContractInfo._id
      }
    });
  });
};


// View all contracts info
exports.getContracts = function (req, res, next) {
  ContractInfo.find().sort({contractRecordedDate: -1}).then(documents => {
    if (documents) {
      res.status(200).json({
        message: "Contract Info fetched successfully!",
        contractInfos: documents
      });
    } else {
      res.status(404).json({
        message: "Contract Info not found!"
      });
    }
  });
};


// select a contract Info
exports.getContract = function (req, res, next)  {

  ContractInfo.findOne({
    residentId: req.params.residentId
  }).sort({contractRecordedDate: -1}).then(contractInfo => {
    if (contractInfo) {
      res.status(200).json(contractInfo);
    } else {
      res.status(404).json({
        message: "Contract info not found!"
      });
    }
  });
};

// update an ContractInfo created using a ID
exports.udpateContract = function (req, res, next)  {
  const contractInfo = new ContractInfo({
    _id: req.body.id,
    residentId: req.body.residentId,
    inventoryEntryDate: req.body.inventoryEntryDate,
    inventoryExitDate: req.body.inventoryExitDate,
    contractSignDate: req.body.contractSignDate,
    contractEndDate: req.body.contractEndDate,
    entryDate: req.body.entryDate,
    exitDate: req.body.exitDate,
    coldWaterIndex: req.body.coldWaterIndex,
    hotWaterIndex: req.body.hotWaterIndex,
    nextVisitDate: req.body.nextVisitDate,
    contractRecordedDate: req.body.contractRecordedDate
  });
  ContractInfo.updateOne({
    residentId: req.params.residentId
  }, contractInfo).sort({contractRecordedDate: -1}).then(result => {
    res.status(200).json({
      message: "Update ContractInfo successful!"
    });
  });
  console.log(contractInfo);
};

// delete a contract using resident ID
exports.deleteContract = function (req, res, next)  {
  ContractInfo.deleteMany(
     {residentId : req.params.residentId}
   ).then(result => {
    res.status(200).json({
      message: "contractInfo deleted!"
    });
  });
};


