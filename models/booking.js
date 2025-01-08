const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  room: { type: String, required: true },
  dateBooked: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
