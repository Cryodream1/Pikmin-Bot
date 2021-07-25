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
  item1: Number,
  item2: Number,
  item3: Number,
  item4: Number,
  item5: Number,
  item6: Number,
  item7: Number,
  item8: Number,
})

module.exports = mongoose.model("Data", dataSchema)