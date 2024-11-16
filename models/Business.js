
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  contactPerson: { type: String },
  email: { type: String },
  photos: [String]
});

module.exports = mongoose.model('Business', businessSchema);
