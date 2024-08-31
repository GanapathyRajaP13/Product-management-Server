const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/profile', authenticateToken, userController.getUserProfile);
router.get('/products', authenticateToken, userController.getProducts);
router.post('/review', authenticateToken, userController.getProductReview);

module.exports = router;
