const express = require("express");
const Appartment = require("../models/appartment");
const router = express.Router();
const AppartmentController = require("../controllers/appartments")

// Add a new appartment in the database
router.post("",AppartmentController.createAppartment);

// View all appartments
router.get("", AppartmentController.getAppartments);

// select an appartment
router.get("/:id", AppartmentController.getAppartment);


// update an appartment created using a ID
router.put("/:id", AppartmentController.updateAppartment);

// delete an appartment

router.delete("/:id", AppartmentController.deleteAppartment);

module.exports = router;
