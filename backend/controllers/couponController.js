const Coupon = require("../models/Coupon");

// get all coupon code controller
const getAllCouponCodeController = async (req, res) => {
  try {
    const couponCodes = await Coupon.find().populate("course");

    res.status(200).json(couponCodes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// add new coupon code controller
const addNewCounponCodeController = async (req, res) => {
  try {
    const { name, course, code, discount } = req.body || {};

    if (!name || !course || !code || !discount) {
      return res.status(400).json({
        error: "All Fields are Required!!!",
      });
    }

    const newCoupon = new Coupon({
      name,
      course,
      code,
      discount,
    });

    const createdCoupon = await newCoupon.save();

    if (createdCoupon) {
      res.status(201).json(createdCoupon);
    }
  } catch (err) {
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// change coupon status controller
const changeCouponStatusController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { status } = req.body || {};

    if (!id) {
      return res.status(400).json({
        error: "Please Provide a Valid Coupon Id!!",
      });
    }

    if (!status) {
      return res.status(400).json({
        error: "Please Provide Coupon Status!!",
      });
    }

    const coupon = await Coupon.findById(id);

    // check coupon availebe
    if (!coupon?._id) {
      return res.status(400).json({
        error: "Coupon is not found!! Please try again.",
      });
    }

    // update existing coupon status
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (updatedCoupon?._id) {
      res.status(203).json(updatedCoupon);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// delete single coupon controller
const deleteSingleCouponController = async (req, res) => {
  try {
    const { id } = req.params || {};

    if (!id) {
      return res.status(400).json({
        error: "Please Provide a Valid Coupon ID!!",
      });
    }

    await Coupon.findByIdAndDelete(id);
    res.status(203).json({ deleted: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// apply coupon code controller
const applyCouponCodeController = async (req, res) => {
  try {
    const { courseId, couponCode } = req.body || {};

    if (!courseId) {
      return res.status(400).json({
        error: "Please Provide a Valid Course ID!!",
      });
    }

    if (!couponCode) {
      return res.status(400).json({
        error: "Coupon Code is Required!!",
      });
    }

    const coupon = await Coupon.find({
      course: courseId,
      code: couponCode,
      status: "ACTIVE",
    });

    if (!coupon[0]?._id) {
      return res.status(400).json({
        error:
          "Not found valid coupon, Please try again with another valid coupon code!!",
      });
    }

    res.status(200).json(coupon[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  changeCouponStatusController,
  getAllCouponCodeController,
  addNewCounponCodeController,
  deleteSingleCouponController,
  applyCouponCodeController,
};
