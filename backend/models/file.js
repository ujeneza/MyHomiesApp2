const mongoose = require ('mongoose');
const fileResidentSchema = mongoose.Schema({
  contract: {type: String},
});
module.exports = mongoose.model('fileResident',fileResidentSchema);
