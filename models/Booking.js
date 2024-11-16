
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
  date: { type: Date },
  time: { type: String },
  userEmail: { type: String, required: true },
  userName: { type: String },
  status: { type: String }
});

module.exports = mongoose.model('Booking', bookingSchema);
