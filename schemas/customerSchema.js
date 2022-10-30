const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name not provided."],
  },
  address: {
    type: String,
    required: [true, "Address not provided."],
  },
  nationality: {
    type: String,
    required: [true, "Nationality not provided"],
  },
  cpf: {
    type: String,
    unique: [true, "CPF already exists, provide another one."],
    required: [true, "CPF not provided."],
    validate: {
      validator: function (v) {
        return /\d{11}/.test(v);
      },
    },
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{11}/.test(v);
      },
      message: "{VALUE} is not a valid 11 digit number!",
    },
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [
      true,
      "email field is not provided. Cannot create user without email ",
    ],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
