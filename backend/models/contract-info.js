const mongoose = require ('mongoose');
const contractInfoSchema = mongoose.Schema({
  reresidentId: {type: String},
  inventoryEntryDate:{type: Date},
  inventoryExitDate: {type: Date},
  contractSignDate:{type: Date},
  contractEndDate:{type: Date},
  entryDate:{type: Date},
  exitDate:{type: Date},
  coldWaterIndex: {type: Number},
  hotWaterIndex: {type: Number},
  nextVisitDate: {type: Date},
  contract: {type: String},
  inventoryExit: {type: String},
  inventoryEntry: {type: String},
  exitCalculation: {type: String},
  formalNoticeLetter: {type: String},
  picturesEntryInventory: {type: String},
  picturesExitInventory: {type: String}

});
module.exports = mongoose.model('contractInfo',contractInfoSchema);


