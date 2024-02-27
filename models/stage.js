const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sequence: { type: Number, default: 1},
}, {
  timestamps: true
});

module.exports = mongoose.model('Stage', stageSchema);