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
    name: "shop", // name of the command
    description: "Open the shop", // description

    async run (client, message, args) {
      Data.findOne({
        userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      let embed = new Discord.MessageEmbed()
      if(data.item1 === 1 && data.item2 === 1 && data.item3 === 1 && data.item4 === 1 && data.item5 === 1 && data.item6 === 1) {
        embed.setTitle("You already have every item in the shop!")
      } else {
        embed.setTitle("Buy these items with ;buy 1 or ;buy 2 and so on\nYou can also use them with ;use or ;use 2 and so on")
      }
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
          if(data.item1 === 0) {
            embed.addField(`1: 💻`, `The computer lets you use ;command1 and ;command2, this costs ${currency}500`)
          }
          if(data.item2 === 0) {
            embed.addField(`2: <:smokyProgg:867810659270000640>`, `smoky progg`)
          }
          if(data.item3 === 0) {
            embed.addField(`3: 🎫`, `Allows you to gamble up to 500 dollars at a time, costs ${currency}1200`)
          }
          if(data.item4 === 0) {
            embed.addField(`4: 🎟️`, `Allows you to gamble up to 500 dollars at a time SINGLE USE, costs ${currency}150`)
          }
          if(data.item5 === 0) {
            embed.addField(`5: Item image`, `Item text`)
          }
          if(data.item6 === 0) {
            embed.addField(`6: Item image`, `Item text`)
          }
          if(data.item3 === 1 || data.item3 === 2) {
            if(data.item7 === 0) {
              embed.addField(`7: 🎫`, `Allows you to gamble up to 1000 dollars at a time, costs ${currency}2000`)
            }
          }
          if(data.item7 === 1 || data.item7 === 2) {
            if(data.item8 === 0) {
              embed.addField(`8: 🎫`, `Allows you to gamble as high of an amount as you want, costs ${currency}5000`)
            }
          }
          message.channel.send(embed)
      })
    }
}
