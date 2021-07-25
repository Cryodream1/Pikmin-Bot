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
    name: "par", // name of the command
    description: "Give someone money", // description

    async run (client, message, args) {
      let invalidembed = new Discord.MessageEmbed()
          .setTitle("Invalid command")
          .addField("Example of how to use the command:", ";par 100")
          .setColor("BLUE")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      let noembed = new Discord.MessageEmbed()
          .setTitle("No amount given!")
          .setColor("BLUE")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      let member100 = message.mentions.members.first()
      let user = message.author
      let number = message.content.substring(4)
      let amount = parseInt(number.split(" ")[2])
      if(!amount) return (noembed)
      Data.findOne({
        userID: user.id
      }, (err, data) => {
        if(amount > data.wallet) return message.channel.send(invaildembed)
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
        } else {
          data.wallet -= amount
          data.total -= amount
          data.save().catch(err => console.log(err))
        }})
      Data.findOne({
        userID: member100.id
      }, (err, data) => {
        if(err) console.log(err)
        if(!data) {
          const newData = new Data({
            name: member100.username,
            userID: member100.id,
            lb: "all",
            job: "",
            wallet: amount,
            bank: 0,
            total: 0,
            daily: 0,
            weekly: 0,
            monthly: 0,
            yearly: 0,
          })
          newData.save().catch(err => console.log(err))
          message.channel.send(`${message.author.username}, you payed ${member100.user.username} ${amount}${currency}`)
        } else {
          data.wallet += amount
          data.total += amount
          data.save().catch(err => console.log(err))
          message.channel.send(`${message.author.username}, you payed ${member100.user.username} ${amount}${currency}`)
        }})
    }
}