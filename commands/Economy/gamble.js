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
    name: "gamble", // name of the command
    description: "Gamble your money in a simple 50/50 chance", // description
    cooldown: 180,

    async run (client, message, args) {
      var winner = [
        0,
        1
      ]
      let user = message.author
      let number = message.content.substring(7)
      let amount = parseInt(number.split(" ")[1])
      var index = Math.floor(Math.random() * winner.length);
      let embedlose = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} gambled ${amount}${currency}`)
      .setDescription(`And they lost ${amount}${currency}`)
      if(!amount) {
        message.channel.send(`${message.author.username} please give an amount to gamble`)
      } else {
          Data.findOne({
            userID: user.id
          }, (err, data) => {
            if(err) console.log(err)
            if(!data) {
              const newData = new Data({
                name: user.username,
                userID: user.id,
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
              message.channel.send("You dont have any money!")
            } else {
              if(amount > data.wallet) return message.channel.send(`${message.author.username} you dont have enough money for that!`)
              if(amount > 200) {
                if(data.item3 !== 2) {
                  if(data.item4 !== 2) {
                    if(data.item7 !== 2) {
                      if(data.item8 !== 2) {
                        return message.channel.send("You need to redeem vouchers to gamble more than 200 dollars")
                      }
                    }
                  }
                }
              }
              if(amount > 500) {
                if(data.item7 !== 2) {
                  if(data.item8 !== 2) {
                    return message.channel.send("You need to redeem vouchers to gamble more than 500 dollars")
                  }
                }
              }
              if(amount > 1000) {
                if(data.item8 !== 2) {
                  return message.channel.send("You need to redeem the final voucher to gamble this amount")
                }
              }
              if(index === 0) {
                if(data.item4 === 2) {
                  data.item4 = 0
                }
                message.channel.send(embedlose)
                data.wallet -= amount
                data.total -= amount
                data.save().catch(err => console.log(err))
              }
              if(index === 1) {
                if(data.item4 === 2) {
                  data.item4 = 0
                }
                let embedwin = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} gambled ${currency}${amount}`)
                .setDescription(`${message.author.username} doubled their money`)
                message.channel.send(embedwin)
                data.wallet += amount
                data.total +- amount
                data.save().catch(err => console.log(err))
              }
            }
          })
          
      }
    }
}