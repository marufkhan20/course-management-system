const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    methodType: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },
    cvvCode: {
      type: String,
    },
    paymentName: {
      type: String,
      required: true,
    },
    paypalEmail: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
