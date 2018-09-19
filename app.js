const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const { post, list, get } = require("./controllers/artist");

require("dotenv").config({
  path: path.join(__dirname, "./settings.env")
});

const app = express();

mongoose.connect(
  "DATABASE_CONN=mongodb://jamiebdavis:linkin1@ds263172.mlab.com:63172/mrcodes-music-api",
  { useNewUrlParser: true }
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Mongo DB");
});

app.post("/artist", post);

app.get("/artist", list);

app.get("/artist/:artistId", get);

app.listen(3000, () => {
  console.log("It Works!!, Listening on port 3000");
});
