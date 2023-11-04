const router = require("express").Router();
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createAssignmentController,
  getAllAssignmentsController,
  getAssignmentsByStudentIdController,
  getSingleAssignmentController,
  submitAssignmentController,
  getSubmitAssingmentController,
  assignSubmitAssignmentNumber,
} = require("../controllers/assignmentController");

// get all assignments route
router.get("/", adminAuthMiddleware, getAllAssignmentsController);

// get single assignment
router.get("/:assignmentId", authMiddleware, getSingleAssignmentController);

// get assignments by student id
router.get(
  "/student/:studentId",
  authMiddleware,
  getAssignmentsByStudentIdController
);

// get submit assignment
router.get(
  "/submit-assignment/:assignmentId/:studentId",
  authMiddleware,
  getSubmitAssingmentController
);

// create new assignment route
router.post("/create", adminAuthMiddleware, createAssignmentController);

// submit assignment
router.post("/submit-assignment", authMiddleware, submitAssignmentController);

// assign submit assignment number
router.patch('/assign-number/:id', adminAuthMiddleware, assignSubmitAssignmentNumber)

module.exports = router;
