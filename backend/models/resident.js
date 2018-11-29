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
  imagePath: { type: String},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
module.exports = mongoose.model('Resident', residentSchema);
