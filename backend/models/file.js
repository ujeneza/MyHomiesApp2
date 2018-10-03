const mongoose = require ('mongoose');
const fileResidentSchema = mongoose.Schema({
  contractPath: {type: String},
  name: {type: String},
  lastModifiedDate: {type: Date},
});
module.exports = mongoose.model('fileResident',fileResidentSchema);
