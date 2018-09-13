const mongoose = require ('mongoose');
const contractResidentSchema = mongoose.Schema({
  residentID: {type: String},
  inventoryEntryDate:{type: Date},
  coldWaterIndex: {type: Number},
  hotWaterIndex: {type: Number},
  ContractDate:{type: Date},
  entryDate:{type: Date},
  ContractEndDate:{type: Date},
  exitDate:{type: Date},
  inventoryExitDate: {type: Date},
  nextVisitDate: {type: Date},
});
module.exports = mongoose.model('ContractResident',contractResidentSchema);


