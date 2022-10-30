const Room = require("../schemas/roomSchema");

const RoomService = {
  async listAll(_, res) {
    try {
      const rooms = await Room.find();

      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async create(req, res) {
    const room = new Room({
      number: req.body.number,
      hotel_id: req.body.hotel_id,
      type: req.body.type,
      available: req.body.available,
      daily_rate: req.body.daily_rate,
    });

    room.save((error, _) => {
      if (error) {
        return res.status(422).send({
          message: error,
        });
      }

      return res.status(200).send({
        message: "Room created successfully!",
      });
    });
  },

  async getById(req, res) {
    const id = req.params.id;

    try {
      const room = await Room.findOne({ _id: id });
      if (!room) {
        res.status(422).json({ message: "Room not found!" });
        return;
      }
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async update(req, res) {
    const id = req.params.id;

    const room = {
      number: req.body.number,
      hotel_id: req.body.hotel_id,
      type: req.body.type,
      available: req.body.available,
      daily_rate: req.body.daily_rate,
    };

    try {
      const updatedRoom = await Room.updateOne({ _id: id }, room);
      if (updatedRoom.matchedCount === 0) {
        res.status(422).json({ message: "Room not found!" });
        return;
      }
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async delete(req, res) {
    const id = req.params.id;

    try {
      const room = await Room.findOne({ _id: id });
      if (!room) {
        res.status(422).json({ message: "Room not found!" });
        return;
      }
      await Room.deleteOne({ _id: id });
      res.status(200).json({ message: "Room deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async getAvailableRooms(req, res) {
    const freeRooms = Room.aggregate([
      {
        $lookup: {
          from: "reservations",
          localField: "_id",
          foreignField: "room_id",
          as: "reservation",
        },
      },
      {
        $match: {
          $and: [
            {
              "reservations.checkin_date": {
                $lte: req.params.checkinDate,
              },
            },
            {
              "reservations.checkout_date": {
                $lte: req.params.checkoutDate,
              },
            },
          ],
        },
      },
      { $project: { reservation: 0 } },
    ]);

    res.status(200).json(freeRooms.exec());
  },
};

module.exports.RoomService = RoomService;
