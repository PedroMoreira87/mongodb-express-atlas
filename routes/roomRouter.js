const router = require("express").Router();
const { RoomService } = require("../services/roomService");

router.post("/", RoomService.create);
router.get("/", RoomService.listAll);
router.get("/:id", RoomService.getById);
router.patch("/:id", RoomService.update);
router.delete("/:id", RoomService.delete);

module.exports = router;
