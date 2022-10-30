const router = require("express").Router();
const { ReservationService } = require("../services/reservationService");

router.post("/", ReservationService.create);
router.get("/", ReservationService.listAll);
router.get("/:id", ReservationService.getById);
router.patch("/:id", ReservationService.update);
router.delete("/:id", ReservationService.delete);

module.exports = router;
