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
    name: "bal", // name of the command
    description: "Check your economy balance", // description

    async run (client, message, args) {

      const member100 = message.mentions.members.first()
      if(!member100) {
        var user = message.author
      } else {
        var user = member100.user
      }

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
          })
          newData.save().catch(err => console.log(err))
          let embed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s balance`)
          .setDescription(`Wallet: ${currency}0\nBank: ${currency}0`)
          .setThumbnail(user.displayAvatarURL({dynamic: true}))
          return message.channel.send(embed)
        } else {
          let embed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s balance`)
          .setDescription(`Wallet: ${currency}${data.wallet}\nBank: ${currency}${data.bank}`)
          .setThumbnail(user.displayAvatarURL({dynamic: true}))
          return message.channel.send(embed)
        }
      })

    }
}