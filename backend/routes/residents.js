const express = require("express");
const Resident = require("../models/resident");
const multer = require("multer");
const router= express.Router();
const checkAuth = require("../middleware/check-auth");
const residentController = require("../controllers/residents")

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
 residentController.createResident);

// Update a resident
router.put("/:id",
checkAuth,
multer({ storage: storage }).single("image"),
residentController.updateResident);

// Get all residents
router.get("", checkAuth,residentController.getAllResident);

// Get one resident
router.get("/:id", residentController.getResident);

router.delete("/:id", residentController.deleteResident);

module.exports = router;
