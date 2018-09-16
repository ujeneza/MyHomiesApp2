const mongoose = require ('mongoose');
const fileResidentSchema = mongoose.Schema({
  residentId: {type: String},
  contract: {type: String},
  inventoryExit: {type: String},
  inventoryEntry: {type: String},
  exitCalculation: {type: String},
  idcard: {type: String},
  formalNoticeLetter: {type: String},
  picturesEntryInventory: {type: String},
  picturesExitInventory: {type: String}
});
module.exports = mongoose.model('FileResident', fileResidentSchema);
