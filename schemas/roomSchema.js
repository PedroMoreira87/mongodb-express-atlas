const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  number: {
    type: Number,
    required: [true, "Number not provided."],
  },
  hotel_id: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Hotel ID not provided."],
  },
  type: {
    type: String,
    enum: ["Single", "Double", "Family", "Presidential"],
    required: [true, "Type not provided."],
  },
  available: {
    type: Boolean,
    default: true,
  },
  daily_rate: {
    type: Number,
    required: [true, "Daily rate not provided."],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);
