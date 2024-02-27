const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: String,
  clientType: {type: String, required: true, enum: ['Buyer', 'Seller']},
  address: String,
  description: String,
  curStage: {type: Number, default: 1, required: true},
  approvalAmt: Number,
  listingPrice: Number,
  salePrice: Number,
  commission: Number,
  closeDate: Date,
  notes: String,
}, {
  timeseries: true
});

module.exports = mongoose.model('Client', clientSchema);