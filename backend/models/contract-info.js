const mongoose = require ('mongoose');
const contractInfoSchema = mongoose.Schema({
  residentId: {type: String},
  inventoryEntryDate:{type: Date},
  inventoryExitDate: {type: Date},
  contractSignDate:{type: Date},
  contractEndDate:{type: Date},
  entryDate:{type: Date},
  exitDate:{type: Date},
  coldWaterIndex: {type: Number},
  hotWaterIndex: {type: Number},
  nextVisitDate: {type: Date},

});
module.exports = mongoose.model('contractInfo',contractInfoSchema);


