const express = require("express");
const ContractResident = require("../models/contract-resident");
const router = express.Router();

// add contract information

router.post("", (req, res, next) => {
  const contractResident = new ContractResident({
    residentID: req.body.residentID,
    inventoryEntryDate:req.body. inventoryEntryDate,
    inventoryExitDate: req.body.inventoryExitDate,
    ContractSignDate:req.body.ContractSignDate,
    ContractEndDate:req.body.ContractEndDate,
    entryDate:req.body.entryDate,
    exitDate:req.body.exitDate,
    coldWaterIndex: req.body.coldWaterIndex,
    hotWaterIndex: req.body.hotWaterIndex,
    nextVisitDate:req.body.nextVisitDate
  });
  contractResident.save().then(createdContractResident => {
    res.status(201).json({
      message: "ResidentContract added successfully",
      contractResident: {
        ...createdContractResident,
        id: createdContractResident._id
      }
    });
  });
});

// View all contracts info
router.get("", (req, res, next) => {
  ContractResident.find().then(documents => {
    if (documents) {
      res.status(200).json({
        message: "Contract Info fetched successfully!",
        contractResidents: documents
      });
    } else {
      res.status(404).json({
        message: "Contract Info not found!"
      });
    }
  });
});


// select a contract Info
router.get("/:id", (req, res, next) => {
  ContractResident.findById(req.params.id).then(contractResident => {
    if (contractResident) {
      res.status(200).json(contractResident);
    } else {
      res.status(404).json({
        message: "Contract info not found!"
      });
    }
  });
});

// update an ContractResident created using a ID
router.put("/:id", (req, res, next) => {
  const contractResident = new ContractResident({
    _id: req.body.id,
    residentID: req.body.residentID,
    inventoryEntryDate:req.body. inventoryEntryDate,
    inventoryExitDate: req.body.inventoryExitDate,
    ContractSignDate:req.body.ContractSignDate,
    ContractEndDate:req.body.ContractEndDate,
    entryDate:req.body.entryDate,
    exitDate:req.body.exitDate,
    coldWaterIndex: req.body.coldWaterIndex,
    hotWaterIndex: req.body.hotWaterIndex,
    nextVisitDate:req.body.nextVisitDate
  });
  ContractResidentt.updateOne({
    _id: req.params.id
  }, contractResident).then(result => {
    res.status(200).json({
      message: "Update ContractResident successful!"
    });
  });
});

// delete an contractInfo

router.delete("/:id", (req, res, next) => {
  ContractResidentt.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "contractInfo deleted!" });
  });
});

module.exports = router;
