const mongoose = require ('mongoose');
const contractResidentSchema = mongoose.Schema({
  residentID: {type: String},
  inventoryEntryDate:{type: Date},
  inventoryExitDate: {type: Date},
  ContractSignDate:{type: Date},
  ContractEndDate:{type: Date},
  entryDate:{type: Date},
  exitDate:{type: Date},
  coldWaterIndex: {type: Number},
  hotWaterIndex: {type: Number},
  nextVisitDate: {type: Date},
});
module.exports = mongoose.model('ContractResident',contractResidentSchema);


