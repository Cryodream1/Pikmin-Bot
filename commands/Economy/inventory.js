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
    name: "inventory", // name of the command
    description: "Open your inventory", // description

    async run (client, message, args) {
      let member2 = message.mentions.members.first()
      if(!member2) {
        var user = message.author
      } else {
        var user = member2.user
      }
      Data.findOne({
        userID: user.id
    }, (err, data) => {
      if(err) console.log(err);
      let embed = new Discord.MessageEmbed()
      if(data.item1 === 0 && data.item2 === 0 && data.item3 === 0 && data.item4 === 0 && data.item5 === 0 && data.item6 === 0) {
        embed.setTitle(`${user.username} doesnt have any items!`)
      } else {
        embed.setTitle(`${user.username}'s inventory`)
      }
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
        return
      }
      if(data.item1) {
        embed.addField(`1: 💻`, `The computer lets you use ;command1 and ;command2`)
      }
      if(data.item2) {
        embed.addField(`2: <:smokyProgg:867810659270000640>`, `smoky progg`)
      }
      if(data.item3 === 1) {
        embed.addField(`3: 🎫`, `Allows you to gamble up to 500 dollars at a time`)
      }
      if(data.item4 === 1) {
        embed.addField(`4: 🎟️`, `Allows you to gamble up to 500 dollars at a time SINGLE USE`)
      }
      if(data.item5) {
        embed.addField(`5: Item image`, `Item text`)
      }
      if(data.item6) {
        embed.addField(`6: Item image`, `Item text`)
      }
      if(data.item7 === 1) {
        embed.addField(`7: 🎫`, `Allows you to gamble up to 1000 dollars at a time`)
      }
      if(data.item8 === 1) {
        embed.addField(`8: 🎫`, `Allows you to gamble as high of an amount as you want`)
      }
      message.channel.send(embed)
      })
    }
}
