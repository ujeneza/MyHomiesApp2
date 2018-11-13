const express = require("express");
const ContractInfo = require("../models/contract-info");
const multer = require("multer");
const router = express.Router();

// add contract information
router.post("", (req, res, next) => {
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
});


// View all contracts info
router.get("", (req, res, next) => {
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
});


// select a contract Info
router.get("/:residentId", (req, res, next) => {

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
  /*  ContractInfo.findOne(req.params.residentId).then(contractInfo => {
     if (contractInfo) {
       res.status(200).json(contractInfo);
     } else {
       res.status(404).json({
         message: "Contract info not found!"
       });
     }
   }); */
});

// update an ContractInfo created using a ID
router.put("/:residentId", (req, res, next) => {
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
});

// delete an contractInfo

router.delete("/:residentId", (req, res, next) => {
  ContractInfo.deleteOne({
    residentId: req.params.residentId
  } || {
    id: req.params.id
  }).then(result => {
    res.status(200).json({
      message: "contractInfo deleted!"
    });
  });
});

/*  router.delete("/:residentId" || "/:id", (req, res, next) => {
  if ("/:id" === req.body.id) {
    ContractInfo.deleteOne({
      _id: req.params.id
    }).then(result => {
      res.status(200).json({
        message: "contractInfo deleted! From ID"
      });
    });
  } else {
    ContractInfo.deleteOne({
      residentId: req.params.residentId
    }).then(result => {
      res.status(200).json({
        message: "contractInfo deleted! from ID"
      });
    });
  }
});  */

module.exports = router;
