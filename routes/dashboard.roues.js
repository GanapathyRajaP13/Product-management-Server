const express = require("express");
const router = express.Router();
const dashController = require("../controllers/dashBoard.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.get(
  "/getProductCount",
  authenticateToken,
  dashController.getProductCount
);
router.get(
  "/getProductSalesUnit",
  authenticateToken,
  dashController.getProductSalesUnit
);
router.get(
  "/getProductRevenue",
  authenticateToken,
  dashController.getProductRevenue
);
router.get("/getUnitSold", authenticateToken, dashController.getUnitSold);

module.exports = router;
