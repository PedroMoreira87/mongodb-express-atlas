const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  employee_id: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "Employee ID not provided."],
  },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Room ID not provided."],
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Customer ID not provided."],
  },
  canceled: {
    type: Boolean,
    default: false,
  },
  total_price: {
    type: Number,
    required: [true, "Total price not provided."],
  },
  payment_method: {
    type: String,
    enum: ["Credit Card", "Debit Card", "Cash", "Pix"],
    required: [true, "Payment method not provided."],
  },
  checkin_date: {
    type: Date,
    required: [true, "Checkin date not provided."],
  },
  checkout_date: {
    type: Date,
    required: [true, "Checkout date not provided."],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
