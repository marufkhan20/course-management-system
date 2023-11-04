const {
  updateProfileController,
  getSingleProfileController,
} = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

// get existing profile by user id
router.get("/:userId", authMiddleware, getSingleProfileController);

// update existing profile by user id
router.patch("/:userId", authMiddleware, updateProfileController);

module.exports = router;
