const router = require("express").Router();
const { HotelService } = require("../services/hotelService");

router.post("/", HotelService.create);
router.get("/", HotelService.listAll);
router.get("/:id", HotelService.getById);
router.patch("/:id", HotelService.update);
router.delete("/:id", HotelService.delete);

module.exports = router;
