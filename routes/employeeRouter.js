const router = require("express").Router();
const { EmployeeService } = require("../services/employeeService");

router.post("/", EmployeeService.create);
router.get("/", EmployeeService.listAll);
router.get("/:id", EmployeeService.getById);
router.patch("/:id", EmployeeService.update);
router.delete("/:id", EmployeeService.delete);

module.exports = router;
