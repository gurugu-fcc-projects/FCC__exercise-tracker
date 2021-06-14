const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const allRouter = require("./resources/all.router");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", allRouter);

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mongo database connected");

      const listener = app.listen(process.env.PORT || 3000, () => {
        console.log("Your app is listening on port " + listener.address().port);
      });
    }
  }
);
