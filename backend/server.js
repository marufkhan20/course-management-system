const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const {
  authRoutes,
  courseRoutes,
  profileRoutes,
  paymentRoutes,
  assignmentRoutes,
  certificateRoutes,
  paymentRoute,
  couponRoutes,
  creditReferralRoutes,
  studentRoutes,
  reviewRoutes,
} = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "8mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

// set public folder
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payment-method", paymentRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/coupon-code", couponRoutes);
app.use("/api/credit-referral", creditReferralRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/review", reviewRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// database connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log("error", err));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
