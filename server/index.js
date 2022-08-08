const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route.js");
const campaignRoute = require("./routes/campaign.route.js");
const authRoute = require("./routes/auth.js");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const port = process.env.port || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`app is listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.use("/user", userRoute);
// app.use("/campaign", campaignRoute);
app.use("/api/v4/auth", authRoute);
app.use("/api/v4/campaign", require("./routes/campaign"));
