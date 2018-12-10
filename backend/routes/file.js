const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const FileResident = require("../models/file");
const jwt = require("jsonwebtoken");

const fileController = require("../controllers/file")

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
router.post("", multer({
    storage: storage
  }).array('file', 4),
 fileController.createFile);


// View all contracts files
router.get("", fileController.getFiles);



router.delete("/residentFile/:residentIdFile", fileController.deleteFilesResidentId);

// Delete resident
router.delete("/:id", fileController.deleteFile);



// Download files
router.get("/:fileName", fileController.downloadFile);


module.exports = router;
