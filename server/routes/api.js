const router = require("express").Router();

router.use("/", require('./AuthRoutes'));
router.use("/admin", require('./AdminRoutes'));
router.use("/city", require('./CityRoutes'));
router.use("/company", require('./CompanyRoutes'));
router.use("/country", require('./CountryRoutes'));
router.use("/department", require('./DepartmentRoutes'));
router.use("/education", require('./EducationRoutes'));
router.use("/employee", require('./EmployeeRoutes'));
router.use("/family-info", require('./FamilyInfoRoutes'));
router.use("/personal-info", require('./PersonalInfoRoutes'));
router.use("/position", require('./PositionRoutes'));
router.use("/role", require('./RoleRoutes'));
router.use("/salary", require('./SalaryRoutes'));
router.use("/state", require('./StateRoutes'));
router.use("/leave-application-emp", require('./LeaveApplicationEmpRoutes'));
router.use("/leave-application-hr", require('./LeaveApplicationHRRoutes'));
router.use("/work-experience", require('./WorkExperienceRoutes'));

module.exports = router;