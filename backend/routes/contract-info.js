const express = require("express");
const ContractInfo = require("../models/contract-info");
const multer = require("multer");
const router = express.Router();
const ContractController = require("../controllers/contract-info");

// add contract information
router.post("", ContractController.createContract);


// View all contracts info
router.get("", ContractController.getContracts);


// select a contract Info
router.get("/:residentId", ContractController.getContract);

// update an ContractInfo created using a ID
router.put("/:residentId", ContractController.udpateContract);

// delete a contract using residentID

router.delete("/:residentId",ContractController.deleteContract);


module.exports = router;
