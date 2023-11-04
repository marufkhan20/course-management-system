const {
  addNewCounponCodeController,
  getAllCouponCodeController,
  changeCouponStatusController,
  deleteSingleCouponController,
  applyCouponCodeController,
} = require("../controllers/couponController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const router = require("express").Router();

// get all coupon code route
router.get("/", adminAuthMiddleware, getAllCouponCodeController);

// add new coupon route
router.post("/", adminAuthMiddleware, addNewCounponCodeController);

// change coupon status route
router.patch(
  "/change-status/:id",
  adminAuthMiddleware,
  changeCouponStatusController
);

// apply coupon code route
router.post("/apply-coupon-code", applyCouponCodeController);

// delete single coupon
router.delete("/:id", adminAuthMiddleware, deleteSingleCouponController);

module.exports = router;
