const mongoose = require("mongoose");

const campaignSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  catogary: String,
  title: String,
  author: String,
  discription: String,
  image: String,
  goal: Number,
  days: Number,
  pledged: { type: Number, default: 0 },
  noOfBackers: { type: Number, default: 0 },
  expDate: {
    type: Date,
  },
  expectedDonation: String,
  maximumDonation: String,
  city: String,
  country: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("campaignModel", campaignSchema);
