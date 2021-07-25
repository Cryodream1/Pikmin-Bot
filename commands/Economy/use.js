const Discord = require('discord.js')
const mongoose = require("mongoose")
const privatebotconfig = require('../../../privatebotconfig.json')
const { currency } = require('../../config.json');

mongoose.connect(privatebotconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Data = require("../models/data.js")



module.exports = {
    name: "use", // name of the command
    description: "Use an item", // description

    async run (client, message, args) {
      Data.findOne({
        userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
        const newData = new Data({
          name: message.author.username,
          userID: message.author.id,
          lb: "all",
          job: "",
          wallet: 0,
          bank: 0,
          total: 0,
          daily: 0,
          weekly: 0,
          monthly: 0,
          yearly: 0,
          item1: 0,
          item2: 0,
          item3: 0,
          item4: 0,
          item5: 0,
          item6: 0,
          item7: 0,
          item8: 0,
        })
        newData.save().catch(err => console.log(err))
      }
      let number = message.content.substring(4)
      let argus = number.split(" ")[1]
      if(argus === "1") {
          if(data.item1 === 0) {
              return message.channel.send("You dont have this item!")
          }
          return message.channel.send("This item cannot be used!")
      }
      if(argus === "2") {
          if(data.item2 === 0) {
              return message.channel.send("You dont have this item!")
          }
          return message.channel.send("smoky progg")
      }
      if(argus === "3") {
        if(data.item3 === 0) {
            return message.channel.send("You dont have this item!")
        }
          data.item3 = 2
          data.save().catch(err => console.log(err))
          return message.channel.send("You can gamble up to 500 dollars now!")
      }
      if(argus === "4") {
        if(data.item4 === 0) {
            return message.channel.send("You dont have this item!")
        }
        data.item4 = 2
        data.save().catch(err => console.log(err))
        return message.channel.send("You can gamble up to 500 dollars on your next use of the command!")
      }
      if(argus === "5") {
        if(data.item5 === 0) {
            return message.channel.send("You dont have this item!")
        }
        return message.channel.send("This item cannot be used!")
      }
      if(argus === "6") {
        if(data.item6 === 0) {
            return message.channel.send("You dont have this item!")
        }
        return message.channel.send("This item cannot be used!")
      }
      if(argus === "7") {
        if(data.item7 === 0) {
            return message.channel.send("You dont have this item!")
        }
          data.item7 = 2
          data.save().catch(err => console.log(err))
          return message.channel.send("You can gamble up to 1000 dollars now!")
      }
      if(argus === "8") {
        if(data.item8 === 0) {
            return message.channel.send("You dont have this item!")
        }
          data.item8 = 2
          data.save().catch(err => console.log(err))
          return message.channel.send("You can gamble as much money as you want now!!")
      }
      })
    }
}
