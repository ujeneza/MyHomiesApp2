const express = require("express");
const FileResident = require("../models/file-resident");
const multer = require("multer");
const router= express.Router();

// type files
const MIME_TYPE_MAP = {
  "file/doc": "doc",
  "file/docx": "docx",
  "file/pdf": "pdf",
  "file/xlsx": "xlsx",
  "file/xls": "xls",
  "file/png": "png",
  "file/jpeg": "jpg",
  "file/jpg": "jpg"
};

// create a storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/files");
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

// add new files

router.post("",
 multer({ storage: storage }).array("file"),
 (req, res, next) => {

  const url = req.protocol + "://" + req.get("host");
  const fileResident = new FileResident({
    residentID: req.body.residentID,
    inventoryEntryDate: url + "/files/" + req.file.filename,
    inventoryExitDate: url + "/files/" + req.file.filename,
    ContractSignDate: url + "/files/" + req.file.filename,
    ContractEndDate: url + "/files/" + req.file.filename,
    entryDate: url + "/files/" + req.file.filename,
    exitDate: url + "/files/" + req.file.filename,
    coldWaterIndex: url + "/files/" + req.file.filename,
    hotWaterIndex: url + "/files/" + req.file.filename,
    nextVisitDate: url + "/files/" + req.file.filename,
  });
  fileResident.save().then(createdfileResident=> {
    res.status(201).json({
      message: "fileResident added successfully",
      resident: {
        ...createdfileResident,
        id: createdfileResident._id
      }
    });
  });
});

// update
router.put("/:id",
multer({ storage: storage }).array("file"),
(req,res,next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const ileResident = new FileResident({
    _id: req.body.id,
    residentID: req.body.residentID,
    contract: url + "/files/" + req.file.filename,
    inventoryExit: url + "/files/" + req.file.filename,
    inventoryEntry:url + "/files/" + req.file.filename,
    exitCalculation: url + "/files/" + req.file.filename,
    idcard: url + "/files/" + req.file.filename,
    formalNoticeLetter: url + "/files/" + req.file.filename,
    picturesEntryInventory: url + "/files/" + req.file.filename,
    picturesExitInventory: url + "/files/" + req.file.filename,
  });
  Resident.updateOne({_id: req.params.id}, resident).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

// get all
router.get("", (req, res, next) => {
  FileResident.find().then(documents => {
    res.status(200).json({
      message: "residents fetched successfully!",
      fileResident: documents
    });
  });
});

// select a file Info
router.get("/:id", (req, res, next) => {
  FileResident.findById(req.params.id).then(fileResident => {
    if (fileResident ) {
      res.status(200).json(fileResident);
    } else {
      res.status(404).json({
        message: "fileResident not found!"
      });
    }
  });
});

// delete FileResident
router.delete("/:id", (req, res, next) => {
  FileResident.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "FileResident deleted!" });
  });
});


module.exports = router;

