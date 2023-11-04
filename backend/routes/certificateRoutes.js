const {
  requestForCertificateController,
  getCertificatesByStudentIdController,
  getPendingCertificatesController,
  updateCertificateStatusController,
  downloadCerfiticateController,
} = require("../controllers/certificateController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

// download course certificate
router.get("/download-certificate/:courseId", downloadCerfiticateController);

// get all pending certificates
router.get("/pending", adminAuthMiddleware, getPendingCertificatesController);

// get certificates by student id
router.get(
  "/student/:studentId",
  authMiddleware,
  getCertificatesByStudentIdController
);

// request for certificate
router.post(
  "/request-for-certificate",
  authMiddleware,
  requestForCertificateController
);

// update certificate status
router.patch(
  "/update-status/:id",
  adminAuthMiddleware,
  updateCertificateStatusController
);

module.exports = router;
