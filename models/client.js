const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: String,
  clientType: {type: String, required: true},
  address: String,
  description: String,
  curStage: {type: Number, default: 1, required: true},
  approvalAmt: Number,
  salePrice: Number,
  commission: Number,
  closeDate: Date,
}, {
  timeseries: true
});

module.exports = mongoose.model('Client', clientSchema);