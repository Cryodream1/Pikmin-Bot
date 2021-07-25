const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "gamble", // name of the command
    description: "Gamble your money in a simple 50/50 chance", // description

    async run (client, message, args) {
      var winner = [
        0,
        1
      ]
      let number = message.content.substring(7)
      let amount = parseInt(number.split(" ")[1])
      let currentBalance = await db.get(`wallet_${message.author.id}`)
      if(currentBalance === null) currentBalance = 0
      var index = Math.floor(Math.random() * winner.length);
      let embedlose = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} gambled ${amount}${currency}`)
      .setDescription(`And they lost ${amount}${currency}`)
      if(!amount) {
        message.channel.send(`${message.author.username} please give an amount to gamble`)
      } else {
        if(amount > currentBalance) {
          message.channel.send(`${message.author.username} you dont have enough money for that!`)
        } else {
          await db.set(`wallet_${message.author.id}`, currentBalance -= amount)
          if(index === 0) {
            message.channel.send(embedlose)
          }
          if(index === 1) {
            let embedwin = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} gambled ${amount}${currency}`)
            .setDescription(`${message.author.username} doubled their money`)
            message.channel.send(embedwin)
            let amount2 = amount*=2
            await db.set(`wallet_${message.author.id}`, currentBalance + amount2)
          }
        }
      }
    }
}