const moment = require("moment");

const Reservation = require("../schemas/reservationSchema");
const Room = require("../schemas/roomSchema");
const Customer = require("../schemas/customerSchema");

const ReservationService = {
  async listAll(_, res) {
    try {
      const reservations = await Reservation.find();

      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async create(req, res) {
    const room = await Room.findOne({ _id: req.body.room_id });

    const checkinDate = moment(req.body.checkin_date);
    const checkoutDate = moment(req.body.checkout_date);

    const totalDays = checkoutDate.diff(checkinDate, "days");

    if (totalDays <= 0) {
      return res
        .status(400)
        .send({ message: "Your reservation has to have at least one day." });
    }

    const reservationTotalPrice = totalDays * room.daily_rate;

    const reservation = new Reservation({
      employee_id: req.body.employee_id,
      room_id: req.body.room_id,
      customer_id: req.body.customer_id,
      total_price: reservationTotalPrice,
      payment_method: req.body.payment_method,
      checkin_date: req.body.checkin_date,
      checkout_date: req.body.checkout_date,
    });

    reservation.save((error, _) => {
      if (error) {
        return res.status(422).send({
          message: error,
        });
      }

      return res.status(200).send({
        message: "Reservation created successfully!",
      });
    });
  },

  async getById(req, res) {
    const id = req.params.id;

    try {
      const reservation = await Reservation.findOne({ _id: id });
      if (!reservation) {
        res.status(422).json({ message: "Reservation not found!" });
        return;
      }
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async update(req, res) {
    const id = req.params.id;

    const reservation = {
      employee_id: req.body.employee_id,
      room_id: req.body.room_id,
      customer_id: req.body.customer_id,
      canceled: req.body.canceled,
      total_price: req.body.total_price,
      payment_method: req.body.payment_method,
      checkin_date: req.body.checkin_date,
      checkout_date: req.body.checkout_date,
    };

    try {
      const updatedReservation = await Reservation.updateOne(
        { _id: id },
        reservation
      );
      if (updatedReservation.matchedCount === 0) {
        res.status(422).json({ message: "Reservation not found!" });
        return;
      }
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async delete(req, res) {
    const id = req.params.id;

    try {
      const reservation = await Reservation.findOne({ _id: id });
      if (!reservation) {
        res.status(422).json({ message: "Reservation not found!" });
        return;
      }
      await Reservation.deleteOne({ _id: id });
      res.status(200).json({ message: "Reservation deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async getReservationsByCustomerName(req, res) {
    const name = req.query.name;

    const { _id: customer_id } = await Customer.findOne({ fullName: name });

    try {
      const reservations = await Reservation.find({
        customer_id: customer_id,
      });
      if (!reservations) {
        res.status(422).json({ message: "Reservation not found!" });
        return;
      }
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  async sumEarnFromDoubleRooms(req, res) {
    const query = Reservation.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "room_id",
          foreignField: "_id",
          as: "room",
        },
      },
      {
        $match: {
          "room.type": "Double",
        },
      },
      {
        $group: {
          _id: "$room",
          total_price: { $sum: "$total_price" },
        },
      },
    ]);

    const result = await query.exec();

    res.status(200).json(result);
  },
};

module.exports.ReservationService = ReservationService;
