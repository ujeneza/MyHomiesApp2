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

// Add contract files
router.post("", multer({ storage: storage }).array('file',4),
(req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.files);
  const fileResident = new FileResident ({
    contract: url + "/uploads/" + req.files[0].fieldname +"/" + req.files[0].filename
  });
  console.log(fileResident + "before saving");
  fileResident.save().then(createdFileResident => {
    res.status(201).json({
      message: "Contract added successfully",
      fileResident: {
        ...createdFileResident,
        id: createdFileResident._id
      }
    });

  });
  console.log(fileResident + "after saving");
});


// View all contracts files
router.get("", (req, res, next) => {
  FileResident.find().then(documents => {
    if (documents) {
      res.status(200).json({
        message: "Contract Info fetched successfully!",
        fileResidents: documents
      });
    } else {
      res.status(404).json({
        message: "Contract Info not found!"
      });
    }
  });
});

// get one file
router.get("/:id", (req, res, next) => {
  FileResident.findById(req.params.id).then(fileResident => {
    if (fileResident) {
      res.status(200).json(fileResident);
      console.log(fileResident);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

// Delete a file

router.delete("/:id", (req, res, next) => {
  console.log(FileResident + 'tous les files');
  FileResident.deleteOne({_id: req.params.id }).then(result => {
    if (result) {
      res.status(200).json({
        message: "Contract Info fetched successfully!",
      });
    } else {
      res.status(404).json({
        message: "Contract Info not found!"
      });
    }
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
