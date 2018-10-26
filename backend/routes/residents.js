const express = require("express");
const Resident = require("../models/resident");
const multer = require("multer");
const router= express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

// Create a storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
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

// Add a new resident
router.post("",
 multer({ storage: storage }).single("image"),
 (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.file);
  const resident = new Resident({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    appartmentInfo: req.body.appartmentInfo,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    dateofBirth: req.body.dateofBirth,
    nationality: req.body.nationality,
    residentOtherInfo: req.body.residentOtherInfo,
    imagePath: url + "/images/" + req.file.filename
  });
  resident.save().then(createdResident => {
    res.status(201).json({
      message: "Resident added successfully",
      resident: {
        ...createdResident,
        id: createdResident._id
      }

    });
  });
});
// Update a resident
router.put("/:id",
multer({ storage: storage }).single("image"),
(req,res,next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const resident = new Resident({
    _id: req.body.id,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    appartmentInfo: req.body.appartmentInfo,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    dateofBirth: req.body.dateofBirth,
    nationality: req.body.nationality,
    residentOtherInfo: req.body.residentOtherInfo,
    imagePath: imagePath
  });

  Resident.updateOne({_id: req.params.id}, resident).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

// Get all residents
router.get("", (req, res, next) => {
  Resident.find().then(documents => {
    res.status(200).json({
      message: "residents fetched successfully!",
      residents: documents
    });
  });
});

// Get one resident
router.get("/:id", (req, res, next) => {
  Resident.findById(req.params.id).then(resident => {
    if (resident) {
      res.status(200).json(resident);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
   Resident.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Resident deleted!" });
  });
});


module.exports = router;
