const express = require("express");
const ContractInfo = require("../models/contract-info");
const multer = require("multer");
const router = express.Router();

// type files
const MIME_TYPE_MAP = {
  "doc/doc": "doc",
  "doc/docx": "docx",
  "doc/pdf": "pdf",
  "doc/xlsx": "xlsx",
  "doc/xls": "xls",
  "doc/png": "png",
  "doc/jpeg": "jpg",
  "doc/jpg": "jpg"
};

// create a storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/docs");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
// add contract information
router.post("", multer({ storage: storage }).fields([
  { name: 'contract', maxCount: 2 },
  { name: 'inventoryExit', maxCount: 1 },
  { name: 'inventoryEntry', maxCount: 1 },
  { name: 'exitCalculation', maxCount: 1 },
  { name: 'formalNoticeLetter', maxCount: 1 },
  { name: 'picturesEntryInventory', maxCount: 50 },
  { name: 'picturesExitInventory', maxCount: 50 },
]),
(req, res, next) => {
 const url = req.protocol + "://" + req.get("host");
  const contractInfo = new ContractInfo({
    reresidentId: req.body.reresidentId,
    inventoryEntryDate:req.body. inventoryEntryDate,
    inventoryExitDate: req.body.inventoryExitDate,
    contractSignDate:req.body.contractSignDate,
    contractEndDate:req.body.contractEndDate,
    entryDate:req.body.entryDate,
    exitDate:req.body.exitDate,
    coldWaterIndex: req.body.coldWaterIndex,
    hotWaterIndex: req.body.hotWaterIndex,
    nextVisitDate:req.body.nextVisitDate,
    contract: url + "/docs/"  + req.files[0].fieldname + req.files[0].filename,
    inventoryExit: url + "/docs/" + req.files[0].fieldname + req.files[0].filename,
    inventoryEntry: url + "/docs/" + req.files[0].fieldname + req.files[0].filename,
    exitCalculation: url + "/docs/" + req.files[0].fieldname + req.files[0].filename,
    formalNoticeLetter: url + "/docs/" + req.files[0].fieldname + req.files[0].filename,
    picturesEntryInventory: url + "/docs/" + req.files[0].fieldname + req.files[0].filename,
    picturesExitInventory: url + "/docs/" + req.files[0].fieldname + req.files[0].filename,
  });
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
  ContractInfo.find().then(documents => {
    if (documents) {
      res.status(200).json({
        message: "Contract Info fetched successfully!",
        contractInfod: documents
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
  ContractInfo.findById(req.params.id).then(contractInfo => {
    if (contractInfo) {
      res.status(200).json(contractInfo);
    } else {
      res.status(404).json({
        message: "Contract info not found!"
      });
    }
  });
});

// update an ContractInfo created using a ID
router.put("/:id", (req, res, next) => {
  const contractInfo = new ContractInfo({
    _id: req.body.id,
    reresidentId: req.body.reresidentId,
    inventoryEntryDate:req.body. inventoryEntryDate,
    inventoryExitDate: req.body.inventoryExitDate,
    contractSignDate:req.body.contractSignDate,
    contractEndDate:req.body.contractEndDate,
    entryDate:req.body.entryDate,
    exitDate:req.body.exitDate,
    coldWaterIndex: req.body.coldWaterIndex,
    hotWaterIndex: req.body.hotWaterIndex,
    nextVisitDate:req.body.nextVisitDate,
    contract: contract,
    inventoryExit: inventoryExit,
    inventoryEntry: inventoryEntry,
    exitCalculation:  exitCalculation,
    formalNoticeLetter: formalNoticeLetter,
    picturesEntryInventory:  picturesEntryInventory,
    picturesExitInventory: picturesExitInventory,
  });
  ContractInfo.updateOne({
    _id: req.params.id
  }, contractInfo).then(result => {
    res.status(200).json({
      message: "Update ContractInfo successful!"
    });
  });
});

// delete an contractInfo

router.delete("/:id", (req, res, next) => {
  ContractInfo.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "contractInfo deleted!" });
  });
});

module.exports = router;
