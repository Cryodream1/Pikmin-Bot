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
    name: "daily", // name of the command
    description: "Collect your daily reward", // description

    async run (client, message, args) {
      Data.findOne({
        userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      let reward = 100
      let embedailyyes= new Discord.MessageEmbed()
        .setTitle(`${message.author.username} You claimed ${reward}${currency}`)
        .setDescription(`Comeback tomorrow to claim your daily reward again`)
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
          daily: Date.now(),
          weekly: 0,
          monthly: 0,
          yearly: 0,
        })
        newData.save().catch(err => console.log(err))
        const check = data.daily
        const timeout = 86400000;
        if(check !== null && timeout - (Date.now() - check) > 0) {
          const ms = require("pretty-ms")
          const timeLeft = ms(timeout - (Date.now() - check))
          let embedailyno = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} You already claimed your daily reward!`)
          .setDescription(`You can claim it again in ${timeLeft}`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          message.channel.send(embedailyno)
        } else {
          data.wallet += reward
          data.daily = Date.now();
          data.save().catch(err => console.log(err))

          return message.channel.send(embedailyyes)
        }
      }
      const check = data.daily
      const timeout = 86400000;
        if(check !== null && timeout - (Date.now() - check) > 0) {
          const ms = require("pretty-ms")
          const timeLeft = ms(timeout - (Date.now() - check))
          let embedailyno = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} You already claimed your daily reward!`)
          .setDescription(`You can claim it again in ${timeLeft}`)
        . setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embedailyno)
        } else {
          data.wallet += reward
          data.daily = Date.now();
          data.total = (data.wallet + data.bank)
          data.save().catch(err => console.log(err))

          return message.channel.send(embedailyyes)
        }
      })
    }
}
