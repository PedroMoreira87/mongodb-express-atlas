const router = require("express").Router();
const { CustomerService } = require("../services/customerService");

router.post("/", CustomerService.create);
router.get("/", CustomerService.listAll);
router.get("/:id", CustomerService.getById);
router.patch("/:id", CustomerService.update);
router.delete("/:id", CustomerService.delete);

module.exports = router;
