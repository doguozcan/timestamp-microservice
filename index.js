const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  let { date } = req.params;
  let unix;
  let utc;

  if (!date) date = new Date();

  if (/^\d+$/.test(date)) {
    unix = parseInt(date);
    utc = new Date(unix).toUTCString();
  } else {
    date = new Date(date);
    if (isNaN(date.getTime())) {
      res.json({ error: "Invalid Date" });
      return;
    } else {
      unix = date.getTime();
      utc = date.toUTCString();
    }
  }

  res.json({ unix, utc });
});

var listener = app.listen(
  port,
  console.log("Your app is listening on port " + port)
);
