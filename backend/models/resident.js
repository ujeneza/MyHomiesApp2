const mongoose = require ('mongoose');
const residentSchema = mongoose.Schema({
  lastName: {type: String},
  firstName:  {type: String},
  appartmentInfo: {type: String},
  isRentPaid: {type: Boolean},
  phoneNumber: {type: Number},
  rent:  {type: Number},
  contractEndDate: {type: Date},
  nextVisitDate: {type: Date},
  imagePath: { type: String}
});
module.exports = mongoose.model('Resident', residentSchema);
