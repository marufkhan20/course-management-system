const { Schema, model } = require("mongoose");

const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

const Coupon = model("Coupon", couponSchema);

module.exports = Coupon;
