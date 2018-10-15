const mongoose = require ('mongoose');
const fileResidentSchema = mongoose.Schema({
  filePath: {type: String},
  name: {type: String},
  lastModifiedDate: {type: Date},
  fieldNameFront: {type: String}
});
module.exports = mongoose.model('fileResident',fileResidentSchema);
