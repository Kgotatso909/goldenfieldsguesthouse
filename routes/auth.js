const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const users = [];

// Hash the admin password when the server starts
bcrypt.hash('abcd123', 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    // Store the hashed password for the admin user
    users.push({ username: 'admin', password: hashedPassword });
});

// Login route
router.get('/login', (req, res) => {
    res.render('login'); // Render login page
});

// Handle login form submission
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = { username: user.username }; // Store user info in session
        return res.redirect('/admin-email'); // Redirect to admin email page
    }

    res.status(401).send('Invalid credentials');
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/auth/login');  // Redirect to login page after logout
    });
});




module.exports = router;
