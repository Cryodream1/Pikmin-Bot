const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "gamblerps", // name of the command
    description: "Gamble your money in a simple game of rock paper scissors", // description

    async run (client, message, args) {
      let number = message.content.substring(11)
      let choice = number.split(" ")[0]
      let amount = parseInt(number.split(" ")[1])
      let currentBalance = await db.get(`wallet_${message.author.id}`)
      let amount2 = amount*2
      if(currentBalance === null) currentBalance = 0
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
      if(!amount) {
        message.channel.send(embwed)
      } else {
        if(!choice) {
          message.channel.send(embwed)
        } else
          if(amount > currentBalance) {
          message.channel.send("You dont have enough money!")
          } else {
            await db.set(`wallet_${message.author.id}`, currentBalance -= amount)
            if(choice === ("rock")) {
              var randomness = [
              0,
              1,
              2
            ]
              var index2 = Math.floor(Math.random() * randomness.length);
              if (index2 === 0) {
                message.channel.send(embedloserock)
              }
              if (index2 === 1) {
                message.channel.send(embedtierock)
                await db.set(`wallet_${message.author.id}`, currentBalance + amount)
              }
              if (index2 === 2) {
                message.channel.send(embedwinrock)
                await db.set(`wallet_${message.author.id}`, currentBalance + amount2)
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
              }
              if (index2 === 1) {
                message.channel.send(embedtiepaper)
                await db.set(`wallet_${message.author.id}`, currentBalance + amount)
              }
              if (index2 === 2) {
                message.channel.send(embedwinpaper)
                await db.set(`wallet_${message.author.id}`, currentBalance + amount2)
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
              }
              if (index2 === 1) {
                message.channel.send(embedtiescissors)
                await db.set(`wallet_${message.author.id}`, currentBalance + amount)
              }
              if (index2 === 2) {
                message.channel.send(embedwinscissors)
                await db.set(`wallet_${message.author.id}`, currentBalance + amount2)
              }
            }
        }
      }
    }
}