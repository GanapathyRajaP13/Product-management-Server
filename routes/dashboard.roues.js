const express = require("express");
const router = express.Router();
const dashController = require("../controllers/dashBoard.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.use(authenticateToken);

router.get("/getProductCount", dashController.getProductCount);
router.get("/getProductSalesUnit", dashController.getProductSalesUnit);
router.get("/getProductRevenue", dashController.getProductRevenue);
router.get("/getUnitSold", dashController.getUnitSold);

module.exports = router;
