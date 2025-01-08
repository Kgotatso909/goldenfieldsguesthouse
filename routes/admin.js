const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route for displaying the admin email form (GET)
router.get('/admin-email', (req, res) => {
    // If there's no user in session (meaning not logged in), redirect to login page
    if (!req.session.user) {
        return res.redirect('/auth/login');  // Redirect to login if not authenticated
    }
    res.render('adminEmail');  // Render the admin email form
});

// Route for sending admin email (POST)
router.post('/send-admin-email', adminController.sendAdminEmail);

module.exports = router;
