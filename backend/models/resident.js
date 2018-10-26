const mongoose = require ('mongoose');
const residentSchema = mongoose.Schema({
  lastName: {type: String},
  firstName:  {type: String},
  appartmentInfo: {type: String},
  phoneNumber: {type: Number},
  email:  {type: String},
  dateofBirth:  {type: Date},
  nationality:  {type: String},
  residentOtherInfo:  {type: String},
  imagePath: { type: String}
});
module.exports = mongoose.model('Resident', residentSchema);
