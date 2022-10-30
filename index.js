// initial config
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// credentials
let user = process.env.DB_USER;
let password = encodeURIComponent(process.env.DB_PASSWORD);

// middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// routes
const customerRouter = require("./routes/customerRouter");
app.use("/customer", customerRouter);

const employeeRouter = require("./routes/employeeRouter");
app.use("/employee", employeeRouter);

const hotelRouter = require("./routes/hotelRouter");
app.use("/hotel", hotelRouter);

const reservationRouter = require("./routes/reservationRouter");
app.use("/reservation", reservationRouter);

const roomRouter = require("./routes/roomRouter");
app.use("/room", roomRouter);

app.get("/", (req, res) => {
  res.json({ message: "Djamba's Hotel is online!" });
});

// port
mongoose
  .connect(
    `mongodb+srv://${user}:${password}@cluster0.p0llsye.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB!");
    console.log("Starting server on port 3000.");

    app.listen(3000);
  })
  .catch((err) => console.log(err));
