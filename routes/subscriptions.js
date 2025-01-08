const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Subscribe user
router.post('/subscribe', subscriptionController.subscribeUser);

// Send promo emails
router.get('/sendPromo', subscriptionController.sendPromoEmail);

module.exports = router;
