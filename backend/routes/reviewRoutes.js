const router = require("express").Router();
const {
  createNewReviewController,
  getAllReviewController,
} = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

// get all review
router.get("/", getAllReviewController);

// create new review
router.post("/create", authMiddleware, createNewReviewController);

module.exports = router;
