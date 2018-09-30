const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const FileResident = require("../models/file");



// type files
const MIME_TYPE_MAP = {
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel": "xls",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

// create a storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   const isValid = MIME_TYPE_MAP[file.mimetype];
 let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/uploads");
/*    let error = new Error("Invalid mime type");
    cb(null, "backend/uploads") */
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

router.post("", multer({ storage: storage }).array('file',4),
(req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.files);
  const contract = new FileResident ({
    contract: url + "/uploads/" + req.files[0].fieldname +"/" + req.files[0].filename
  });
  console.log(contract);
  contract.save().then(createdContract => {
    res.status(201).json({
      message: "Contract added successfully",
      contractInfo: {
        ...createdContract,
        id: createdContract._id
      }
    });
  });
});


// formidable, example marche
/*
router.post("", (req, res, next) =>{
  const form = new IncomingForm();
  let readStream;
  form.on('file', (field, file) => {


    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log(contract);
    console.log('file', file.name);
    readStream = fs.createReadStream(file.path);
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);
});
// essai à supprimer
 /* const url = req.protocol + "://" + req.get("host");
    const contract = new FileResident ({
      contract: url + "/file/" + req.file.filename
    });
    contract.save().then(createdContract => {
      res.status(201).json({
        message: "contract added successfully",
        contract: {
          ...createdContract,
          id: createdContract ._id
        }
      });
    }); */

module.exports = router;
