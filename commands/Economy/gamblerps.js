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
    name: "gamblerps", // name of the command
    description: "Gamble your money in a simple game of rock paper scissors", // description

    async run (client, message, args) {
      let number = message.content.substring(11)
      let choice = number.split(" ")[0]
      let amount = parseInt(number.split(" ")[1])
      let amount2 = amount*2
      let embwed = new Discord.MessageEmbed()
        .setTitle("Invalid command")
        .addField("Example of how to use the command", ";gamblerps rock 10000")
      let embedloserock = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is gambling ${amount}${currency}`)
        .setDescription(`You chose rock\n I chose paper\n You lost ${amount}${currency}`)
      let embedlosepaper = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is gambling ${amount}${currency}`)
        .setDescription(`You chose paper\n I chose scissors\n You lost ${amount}${currency}`)
      let embedlosescissors = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is gambling ${amount}${currency}`)
        .setDescription(`You chose scissors\n I chose rock\n You lost ${amount}${currency}`)
      let embedtierock = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is gambling ${amount}${currency}`)
        .setDescription(`You chose rock\n I chose rock\n Its a tie! No money is lost`)
      let embedtiepaper = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is gambling ${amount}${currency}`)
        .setDescription(`You chose paper\n I chose paper\n Its a tie! No money is lost`)
      let embedtiescissors = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is gambling ${amount}${currency}`)
        .setDescription(`You chose scissors\n I chose scissors\n Its a tie! No money is lost`)
      let embedwinrock = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is gambling ${amount}${currency}`)
        .setDescription(`You chose rock\n I chose scissors\n You won ${amount}${currency}`)
      let embedwinpaper = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is gambling ${amount}${currency}`)
        .setDescription(`You chose paper\n I chose rock\n You won ${amount}${currency}`)
      let embedwinscissors = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is gambling ${amount}${currency}`)
        .setDescription(`You chose scissors\n I chose paper\n You won ${amount}${currency}`)
      if(!amount) return message.channel.send(embwed)
      if(!choice) return message.channel.send(embwed)
      Data.findOne({
        userID: message.author.id
      }, (err, data) => {
        if(amount > data.wallet) return message.channel.send("You dont have enough money!")
        if(!data) {
          if(err) console.log(err)
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
          })
          newData.save().catch(err => console.log(err))
          message.channel.send("You dont have any money!")
        } else {
            if(choice === ("rock")) {
              var randomness = [
              0,
              1,
              2
            ]
              var index2 = Math.floor(Math.random() * randomness.length);
              if (index2 === 0) {
                message.channel.send(embedloserock)
                data.wallet -= amount
                data.save().catch(err => console.log(err))
              }
              if (index2 === 1) {
                message.channel.send(embedtierock)
              }
              if (index2 === 2) {
                message.channel.send(embedwinrock)
                data.wallet += amount
                data.save().catch(err => console.log(err))
              }
            }
            if(choice === ("paper")) {
              var randomness = [
                0,
                1,
                2
              ]
              var index2 = Math.floor(Math.random() * randomness.length);
              if (index2 === 0) {
                message.channel.send(embedlosepaper)
                data.wallet -= amount
                data.save().catch(err => console.log(err))
              }
              if (index2 === 1) {
                message.channel.send(embedtiepaper)
              }
              if (index2 === 2) {
                message.channel.send(embedwinpaper)
                data.wallet += amount
                data.save().catch(err => console.log(err))
              }
            }
            if(choice === ("scissors")) {
              var randomness = [
                0,
                1,
                2
              ]
              var index2 = Math.floor(Math.random() * randomness.length);
              if (index2 === 0) {
                message.channel.send(embedlosescissors)
                data.wallet -= amount
                data.save().catch(err => console.log(err))
              }
              if (index2 === 1) {
                message.channel.send(embedtiescissors)
              }
              if (index2 === 2) {
                message.channel.send(embedwinscissors)
                data.wallet += amount
                data.save().catch(err => console.log(err))
              }
            }
        }
      })
    }
}