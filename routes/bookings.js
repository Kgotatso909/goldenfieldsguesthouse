const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route for displaying the booking form (GET)
router.get('/', (req, res) => {
    res.render('bookings');  // Renders the booking form page (booking.ejs)
});

// Route for handling booking form submissions (POST)
router.post('/submit-booking', bookingController.sendEmail);

module.exports = router;
