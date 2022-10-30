const Hotel = require("../schemas/hotelSchema");

const HotelService = {
  async listAll(_, res) {
    try {
      const hotels = await Hotel.find();

      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async create(req, res) {
    const hotel = new Hotel({
      name: req.body.name,
      address: req.body.address,
    });

    hotel.save((error, _) => {
      if (error) {
        return res.status(422).send({
          message: error,
        });
      }

      return res.status(200).send({
        message: "Hotel created successfully!",
      });
    });
  },

  async getById(req, res) {
    const id = req.params.id;

    try {
      const hotel = await Hotel.findOne({ _id: id });
      if (!hotel) {
        res.status(422).json({ message: "Hotel not found!" });
        return;
      }
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async update(req, res) {
    const id = req.params.id;

    const hotel = {
      name: req.body.name,
      address: req.body.address,
    };

    try {
      const updatedHotel = await Hotel.updateOne({ _id: id }, hotel);
      if (updatedHotel.matchedCount === 0) {
        res.status(422).json({ message: "Hotel not found!" });
        return;
      }
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async delete(req, res) {
    const id = req.params.id;

    try {
      const hotel = await Hotel.findOne({ _id: id });
      if (!hotel) {
        res.status(422).json({ message: "Hotel not found!" });
        return;
      }
      await Hotel.deleteOne({ _id: id });
      res.status(200).json({ message: "Hotel deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

module.exports.HotelService = HotelService;
