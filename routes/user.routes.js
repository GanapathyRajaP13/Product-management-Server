const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.get("/profile", authenticateToken, userController.getUserProfile);
router.get("/products", authenticateToken, userController.getProducts);
router.post("/review", authenticateToken, userController.getProductReview);
router.post("/editProfile", authenticateToken, userController.editProfileinfo);
router.post("/generateOtp", authenticateToken, userController.sendOTP);
router.post("/verifyOTP", authenticateToken, userController.verifyOTP);
router.post("/changePassword", authenticateToken, userController.changePassword);

module.exports = router;
