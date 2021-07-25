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
    name: "buy", // name of the command
    description: "Buy an item from the shop", // description

    async run (client, message, args) {
      Data.findOne({
        userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      let number = message.content.substring(4)
      let argus = parseInt(number.split(" ")[1])
      if(!data) {
        if(argus) {
            message.channel.send("You dont have enough money!")
        }
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
        return
      }
      if(argus === 1) {
          if(data.wallet >= 500) {
              if(data.item1 === 0) {
                  message.channel.send("You purchased the computer!")
                  data.wallet -= 500
                  data.total -= 500
                  data.item1 = 1
                  data.save().catch(err => console.log(err))
              } else {
                  message.channel.send("You already have this item!")
              }
          } else {
              message.channel.send("You dont have enough money!")
          }
      }
      if(argus === 2) {
        if(data.wallet >= 500) {
            if(data.item2 === 0) {
                message.channel.send("You purchased the smoky progg!")
                data.wallet -= 500
                data.total -= 500
                data.item2 = 1
                data.save().catch(err => console.log(err))
            } else {
                message.channel.send("You already have this item!")
            }
        } else {
            message.channel.send("You dont have enough money!")
        }
      }
      if(argus === 3) {
        if(data.wallet >= 1200) {
            if(data.item3 === 0) {
                message.channel.send("You purchased the voucher!")
                data.wallet -= 1200
                data.total -= 1200
                data.item3 = 1
                data.save().catch(err => console.log(err))
            } else {
                message.channel.send("You already have this item!")
            }
        } else {
            message.channel.send("You dont have enough money!")
        }
      }
      if(argus === 4) {
        if(data.wallet >= 150) {
            if(data.item4 === 0) {
                message.channel.send("You purchased the single use voucher!")
                data.wallet -= 150
                data.total -= 150
                data.item4 = 1
                data.save().catch(err => console.log(err))
            } else {
                message.channel.send("You already have this item!")
            }
        } else {
            message.channel.send("You dont have enough money!")
        }
      }
      if(argus === 5) {
        if(data.wallet >= 500) {
            if(data.item5 === 0) {
                message.channel.send("You purchased the item 5!")
                data.wallet -= 500
                data.total -= 500
                data.item5 = 1
                data.save().catch(err => console.log(err))
            } else {
                message.channel.send("You already have this item!")
            }
        } else {
            message.channel.send("You dont have enough money!")
        }
      }
      if(argus === 6) {
        if(data.wallet >= 500) {
            if(data.item6 === 0) {
                message.channel.send("You purchased the item 6!")
                data.wallet -= 500
                data.total -= 500
                data.item6 = 1
                data.save().catch(err => console.log(err))
            } else {
                message.channel.send("You already have this item!")
            }
        } else {
            message.channel.send("You dont have enough money!")
        }
      }
      if(argus === 7) {
        if(data.item3 === 1 || data.item3 === 2) {
            console.log("Person has the thing")
        } else {
            return message.channel.send("You cant buy this item!")
        }
        if(data.wallet >= 2000) {
            if(data.item7 === 0) {
                message.channel.send("You purchased the level 2 voucher!!")
                data.wallet -= 2000
                data.total -= 2000
                data.item7 = 1
                data.save().catch(err => console.log(err))
            } else {
                message.channel.send("You already have this item!")
            }
        } else {
            message.channel.send("You dont have enough money!")
        }
      }
      if(argus === 8) {
        if(data.item7 === 1 || data.item7 === 2) {
            console.log("Person has the thing 2")
        } else {
            return message.channel.send("You cant buy this item!")
        }
        if(data.wallet >= 5000) {
            if(data.item8 === 0) {
                message.channel.send("You purchased the final voucher!")
                data.wallet -= 5000
                data.total -= 5000
                data.item8 = 1
                data.save().catch(err => console.log(err))
            } else {
                message.channel.send("You already have this item!")
            }
        } else {
            message.channel.send("You dont have enough money!")
        }
      }
      })
    }
}
