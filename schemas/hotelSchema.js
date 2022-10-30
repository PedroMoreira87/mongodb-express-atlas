const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name not provided."],
  },
  address: {
    type: String,
    required: [true, "Address not provided."],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
