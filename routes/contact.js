const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route for displaying the contact form (GET)
router.get('/', (req, res) => {
    res.render('contact');  // Renders the contact form page (contact.ejs)
});

// Route for handling contact form submissions (POST)
router.post('/send-email', contactController.sendEmail);

module.exports = router;
