const mongoose = require("mongoose")

const dataSchema = mongoose.Schema({
  name: String,
  userID: String,
  lb: String,
  job: String,
  wallet: Number,
  bank: Number,
  total: Number,
  daily: Number,
  weekly: Number,
  monthly: Number,
  yearly: Number,
})

module.exports = mongoose.model("Data", dataSchema)