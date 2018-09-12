const mongoose = require ('mongoose');
const appartmentSchema = mongoose.Schema({
  appartmentCodeName: {type: String},
  appartmentName: {type: String},
  rent:  {type:Number},
  monthlyExpenses: {type: Number},
  eanNumber: {type:Number},
  electricityMeter: {type: Number},
  hotWaterMeter: {type: Number},
  coldWaterMeter:  {type: Number},
});
module.exports = mongoose.model('Appartment', appartmentSchema);

