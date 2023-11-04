const {
  convertCreditToRedeemController,
  getCreditPointsController,
} = require("../controllers/creditReferralController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

// get credit points
router.get("/get-credit/:id", authMiddleware, getCreditPointsController);

// convert credit to redeem points
router.post(
  "/convert-to-redeem",
  authMiddleware,
  convertCreditToRedeemController
);

module.exports = router;
