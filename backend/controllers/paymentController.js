const Payment = require("../models/Payment");

// get payment method by user id
const getPaymentByUserIdController = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("user", userId);

    if (!userId) {
      return res.status(400).json({
        error: "Invalid User ID!!",
      });
    }

    const payments = await Payment.find({ userId });
    console.log(payments);
    res.status(200).json(payments);
  } catch (err) {}
};

// add new payment method controller
const addPaymentMethodController = async (req, res) => {
  try {
    const {
      methodType,
      cardNumber,
      month,
      year,
      cvvCode,
      paymentName,
      paypalEmail,
    } = req.body;
    const userId = req.user.userid || {};

    let payment = undefined;

    if (methodType === "card") {
      payment = new Payment({
        methodType,
        cardNumber,
        month,
        year,
        cvvCode,
        paymentName,
        userId,
      });
    }

    if (methodType === "paypal") {
      payment = new Payment({
        methodType,
        paypalEmail,
        userId,
        paymentName,
      });
    }

    const updatedPayment = await payment.save();

    res.status(201).json(updatedPayment);
  } catch (err) {
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  addPaymentMethodController,
  getPaymentByUserIdController,
};
