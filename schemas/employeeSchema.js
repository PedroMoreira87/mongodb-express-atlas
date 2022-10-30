const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
  fullName: {
    type: String,
    required: [true, "Full name not provided."],
  },
  address: {
    type: String,
    required: [true, "Address not provided."],
  },
  position: {
    type: String,
    enum: ["Manager", "Receptionist", "Housekeeper", "Maintenance", "Cook"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
