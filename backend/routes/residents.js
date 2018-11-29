const express = require("express");
const Resident = require("../models/resident");
const multer = require("multer");
const router= express.Router();
const checkAuth = require("../middleware/check-auth");

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
router.post("", checkAuth,
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
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
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
checkAuth,
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
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Resident.updateOne({_id: req.params.id, creator: req.userData.userId}, resident).then(result => {
    console.log(result.n + "update");
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful!" });
    }
    else
    {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

// Get all residents
router.get("", checkAuth, (req, res, next) => {
  Resident.find({creator: req.userData.userId}).then(documents => {
    if (documents) {
      res.status(200).json({
       message: "residents fetched successfully!",
       residents: documents });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
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
  Resident.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

module.exports = router;
