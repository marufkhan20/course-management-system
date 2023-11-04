const {
  addCourseController,
  getAllCoursesController,
  getCourseByIdController,
  enrollNewCourseController,
  getEnrollStudentsController,
  getEnrollStudentsByCourseIdController,
  getTopSaleCourseController,
  getCourseOrdersController,
  getEnrollCoursesByStudentIdController,
  uploadCourseCertificateController,
} = require("../controllers/courseController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();

// get all courses
router.get("/", getAllCoursesController);

// get course by sales
router.get("/top-sale-course", adminAuthMiddleware, getTopSaleCourseController);

// get enroll students
router.get(
  "/enroll-students",
  adminAuthMiddleware,
  getEnrollStudentsController
);

// get enroll students by course id
router.get(
  "/enroll-students/:courseId",
  adminAuthMiddleware,
  getEnrollStudentsByCourseIdController
);

// get course orders
router.get("/course-orders", adminAuthMiddleware, getCourseOrdersController);

// get course by course id
router.get("/:id", getCourseByIdController);

// get courses by student id
router.get(
  "/student-courses/:studentId",
  authMiddleware,
  getEnrollCoursesByStudentIdController
);

// add new course
router.post("/add-course", adminAuthMiddleware, addCourseController);

// enroll course
router.post("/enroll-course", authMiddleware, enrollNewCourseController);

// upload course certificate
router.patch(
  "/upload-certificate/:id",
  adminAuthMiddleware,
  uploadCourseCertificateController
);

module.exports = router;
