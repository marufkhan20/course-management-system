const {
  addPaymentMethodController,
  getPaymentByUserIdController,
} = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

// get all payment method by user id
router.get("/:userId", authMiddleware, getPaymentByUserIdController);

// add new payment method
router.post("/", authMiddleware, addPaymentMethodController);

module.exports = router;
