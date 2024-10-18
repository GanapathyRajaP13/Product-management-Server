const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.use(authenticateToken);

router.get("/profile", userController.getUserProfile);
router.get("/products", userController.getProducts);
router.post("/review", userController.getProductReview);
router.post("/editProfile", userController.editProfileinfo);
router.post("/generateOtp", userController.sendOTP);
router.post("/verifyOTP", userController.verifyOTP);
router.post("/changePassword", userController.changePassword);

module.exports = router;
