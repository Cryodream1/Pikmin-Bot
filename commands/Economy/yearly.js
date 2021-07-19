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
    name: "yearly", // name of the command
    description: "Collect your daily reward", // description

    async run (client, message, args) {
      Data.findOne({
        userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      let reward = 2500
      let embedailyyes= new Discord.MessageEmbed()
        .setTitle(`${message.author.username} You claimed ${reward}${currency}`)
        .setDescription(`Come back next year to claim your yearly reward again`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      if(!data) {
        const newData = new Data({
          name: message.author.username,
          userID: message.author.id,
          lb: "all",
          job: "",
          wallet: reward,
          bank: 0,
          total: reward,
          daily: 0,
          weekly: 0,
          monthly: 0,
          yearly: Date.now(),
        })
        newData.save().catch(err => console.log(err))
        const check = data.yearly
        const timeout = 31536000000;
        if(check !== null && timeout - (Date.now() - check) > 0) {
          const ms = require("pretty-ms")
          const timeLeft = ms(timeout - (Date.now() - check))
          let embedailyno = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} You already claimed your yearly reward!`)
          .setDescription(`You can claim it again in ${timeLeft}`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          message.channel.send(embedailyno)
        } else {
          data.wallet += reward
          data.yearly = Date.now();
          data.save().catch(err => console.log(err))

          return message.channel.send(embedailyyes)
        }
      }
      const check = data.yearly
      const timeout = 31536000000;
        if(check !== null && timeout - (Date.now() - check) > 0) {
          const ms = require("pretty-ms")
          const timeLeft = ms(timeout - (Date.now() - check))
          let embedailyno = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} You already claimed your yearly reward!`)
          .setDescription(`You can claim it again in ${timeLeft}`)
        . setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embedailyno)
        } else {
          data.wallet += reward
          data.yearly = Date.now();
          data.total = (data.wallet + data.bank)
          data.save().catch(err => console.log(err))

          return message.channel.send(embedailyyes)
        }
      })
    }
}
